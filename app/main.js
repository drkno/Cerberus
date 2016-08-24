'use strict';

let Server = require('./server/serve.js'),
    ListManager = require('./list.js'),
    UserManager = require('./users/users.js');

let setupServer = (config) => {
    let userManager = new UserManager(config.usersFile, config.passwordAlgorithm),
        eventsRoot = config.eventsRoot ? config.eventsRoot : '/wudhagh-ws-events';
    return new Server(config.port, config.htmlRoot, eventsRoot, userManager, config.authentication);
};

exports.run = (config) => {
    let server = setupServer(config),
        manager = new ListManager(config.datastore);

    let currResponse = (socket) => {
        manager.current((obj) => {
            socket.emit('current', obj);
        });
    };
    server.on('connection', currResponse);
    server.on('refresh', currResponse);

    server.on('new', (socket) => {
        manager.newList();
        socket.broadcast.emit('new');
    });

    server.on('add', (socket, data) => {
        manager.addItem(data);
        socket.broadcast.emit('add', data);
    });
    
    server.on('remove', (socket, data) => {
        manager.removeItem(data);
        socket.broadcast.emit('remove', data);
    });
    
    server.on('update', (socket, data) => {
        manager.replaceItem(data.oldName, data.item);
        socket.broadcast.emit('update', data);
    });
    
    server.apiGet('suggestions', (req, res) => {
        manager.getItems((obj) => {
            res.send(obj);
        });
    });
    
    server.on('swipe', (socket, data) => {
        manager.updateFields(data.name, { purchased: data.purchased });
        socket.broadcast.emit('swipe', data);
    });

	server.start();
};
