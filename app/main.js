'use strict';

let Server = require('./server/serve.js'),
    ListManager = require('./list.js'),
    UserManager = require('./users/users.js'),
    fs = require('fs'),
    path = require('path');

let setupServer = (config) => {
    let userManager = new UserManager(config.usersFile, config.passwordAlgorithm),
        eventsRoot = config.eventsRoot ? config.eventsRoot : '/cerberus-ws-events';
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

    server.apiGet('images', (req, res) => {
        fs.readdir(path.join(__dirname, '../www/img'), (err, files) => {
            if (err || !files) {
                res.send({ success: false, images: [] });
            }
            let resData = [];
            for (let i = 0; i < files.length; i++) {
                let pd = path.parse(files[i]),
                    spl = pd.name.split('-'),
                    type = spl[spl.length - 1];
                if (type === 'thumb') {
                    continue;
                }

                let dt = spl[spl.length - 2],
                    sat = spl.slice(0, spl.length - 2).join('-');

                resData.push({
                    sat: sat,
                    type: type,
                    day: parseInt(dt.substr(2, 2)),
                    month: parseInt(dt.substr(0, 2)),
                    hour: parseInt(dt.substr(4, 2)),
                    min: parseInt(dt.substr(6, 2)),
                    location: 'img/' + files[i],
                    thumb: 'img/' + pd.name + '-thumb' + pd.ext
                });
            }
            res.send({ success: true, images: resData });
        });
    });

	server.start();
};
