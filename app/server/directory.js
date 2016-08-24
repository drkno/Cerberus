'use strict';

﻿let fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
	url = require('url');

exports.dir = (htmlRoot) => {
    for (let key in htmlRoot) {
        if (htmlRoot.hasOwnProperty(key)) {
            htmlRoot[key] = path.resolve(path.join(__dirname, htmlRoot[key]));
        }
    }

    return (req, res, next) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.header("X-Powered-By", "Knox Enterprises");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		let p = url.parse(req.url).path;
        if (p.indexOf("/api") < 0) {
            if (p === "/") {
                p = "/index.html";
            }

            let found = false,
                file = null;
            for (let key in htmlRoot) {
                if (htmlRoot.hasOwnProperty(key) && p.startsWith(key)) {
                    file = path.join(htmlRoot[key], p.substring(key.length));
                    file = path.resolve(file);
                    if (file.startsWith(htmlRoot[key])) {
                        found = true;
                    }
                    break;
                }
            }

            if (!found) {
                res.contentType("application/json");
                res.status(400).send('{"complete":false, "message":"bad request"}');
                return;
            }

            let type = mime.lookup(file);
            fs.readFile(file, function(err, data) {
                if (err) {
                    fs.readFile(path.join(htmlRoot[''], '404.html'), function(err, data) {
                        if (err) {
                            res.contentType("application/json");
                            res.status(404).send('{"complete":false, "message":"file not found"}');
                        } else {
                            res.status(404);
                            res.contentType("text/html");
                            res.send(data);
                        }
                    });

                    return;
                }
                res.contentType(type);
                res.send(data);
            });
        } else {
            next();
        }
    };
};
