var express = require('express'),
    socketio = require('socket.io'),
    http = require('http'),
    bodyParser = require('body-parser'),
    auth = require('./auth.js'),
    directory = require('./directory.js');

var Serve = module.exports = function (port, htmlRoot, eventsRoot, userManager, ignoredAuthConfig) {
    if (!htmlRoot) {
        htmlRoot = {
            '/bower_components/': './../../bower_components/',
            '': './../../www/'
        }
    }

    this.serverPort = port ? port : 8080;

    this.express = express();
    this.server = http.Server(this.express);
    
    var authMiddleware = auth.basicUsers(userManager, ignoredAuthConfig);

    if (eventsRoot !== null && eventsRoot !== '') {
        this.io = socketio(this.server, { path: eventsRoot });
        this.io.use(function (socket, next) {
            socket.request.ip = socket.handshake.address;
            authMiddleware(socket.request, socket.request.res, next);
        });
        
        var eventsContainer = this.eventsContainer = {};
        this.io.on('connection', function (socket) {
            if (eventsContainer['connection']) {
                for (var i = 0; i < eventsContainer['connection'].length; i++) {
                    eventsContainer['connection'](socket);
                }
            }

            for (var event in eventsContainer) {
                if (event === 'connection') {
                    continue;
                }

                socket.on(event, function (data) {
                    if (data) {
                        try {
                            data.json = JSON.parse(data);
                        } catch(e) {} 
                    }

                    for (var i = 0; i < eventsContainer[event].length; i++) {
                        eventsContainer[event][i](data, socket);
                    }
                });
            }
        });
    }

    this.express.use(bodyParser.json());
    this.express.use(authMiddleware);
    this.express.use(directory.dir(htmlRoot));
};

var handleApiCall = function(serverCall, api, func) {
    serverCall.call(this, '/api/' + api, function (req, res) {
        try {
            res.contentType("application/json");
            if (func(req, res)) {
                res.status(200).send('{"complete":true}');
            }
        }
		catch (e) {
            console.log(e.stack);
            res.status(400).send('{"complete":false}');
        }
    });
};

Serve.prototype.apiGet = function (api, func) {
    handleApiCall.call(this.express, this.express.get, api, func);
};

Serve.prototype.apiPost = function (api, func) {
    handleApiCall.call(this.express, this.express.post, api, func);
};

Serve.prototype.connected = function (func) {
    this.on('connection', func);
};

Serve.prototype.on = function(event, func) {
    if (!this.eventsContainer[event]) {
        this.eventsContainer[event] = [];
    }
    this.eventsContainer[event].push(func);
};

Serve.prototype.emit = function() {
    this.io.emit.apply(this, arguments);
};

Serve.prototype.start = function () {
    this.server.listen(this.serverPort);
};