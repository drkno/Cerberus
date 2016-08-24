'use strict';

let express = require('express'),
    socketio = require('socket.io'),
    http = require('http'),
    bodyParser = require('body-parser'),
    auth = require('./auth.js'),
    directory = require('./directory.js');

module.exports = class {

    constructor (port, htmlRoot, eventsRoot, userManager, ignoredAuthConfig) {
        if (!htmlRoot) {
            htmlRoot = {
                '/bower_components/': './../../bower_components/',
                '': './../../www/'
            }
        }
    
        this.serverPort = port ? port : 8080;
        this.express = express();
        this.server = http.Server(this.express);
    
        let authMiddleware = auth.basicUsers(userManager, ignoredAuthConfig);
    
        if (eventsRoot !== null && eventsRoot !== '') {
            this.io = socketio(this.server, { path: eventsRoot });
            this.io.use(function (socket, next) {
                socket.request.ip = socket.handshake.address;
                authMiddleware(socket.request, socket.request.res, next);
            });
        
            let eventsContainer = this.eventsContainer = {};
            this.io.on('connection', (socket) => {
                if (eventsContainer['connection']) {
                    for (let i = 0; i < eventsContainer['connection'].length; i++) {
                        eventsContainer['connection'][i](socket);
                    }
                }
            
                for (let event in eventsContainer) {
                    if (!eventsContainer.hasOwnProperty(event) || event === 'connection') {
                        continue;
                    }

                    let eventHandler = (socket) => {
                        return (data) => {
                            for (let i = 0; i < eventsContainer[event].length; i++) {
                                eventsContainer[event][i](socket, data);
                            }
                        };
                    };

                    socket.on(event, eventHandler(socket));
                }

                socket.on('disconnect', () => {
                    socket.removeAllListeners();
                });
            });
        }

        this.express.use(bodyParser.json());
        this.express.use(authMiddleware);
        this.express.use(directory.dir(htmlRoot));
    }

    _handleApiCall (serverCall, api, func) {
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
    }

    apiGet (api, func) {
        this._handleApiCall.call(this.express, this.express.get, api, func);
    }

    apiPost (api, func) {
        this._handleApiCall.call(this.express, this.express.post, api, func);
    }

    emit (name, data) {
        this.io.emit(name, data);
    }

    on (name, func) {
        if (!this.eventsContainer[name]) {
            this.eventsContainer[name] = [];
        }
        this.eventsContainer[name].push(func);
    }

    start () {
        this.server.listen(this.serverPort);
    }
}
