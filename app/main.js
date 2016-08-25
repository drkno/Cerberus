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
        manager = new ListManager(config.datastore),
        settings = {
            power: false,
            mode: 'AM',
            filter: '3k',
            toneSquelch: 'Off',
            afGain: 50,
            squelch: 50,
            noiseBlank: false,
            frequency: 10000000
        };

    server.on('current', (socket) => {
        socket.emit('current', settings);
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

    let settingsUpdate = (type) => {
        server.on(type, (socket, data) => {
            settings[type] = data[type];
            socket.broadcast.emit(type, data);
        });
    };

    settingsUpdate('power');
    settingsUpdate('mode');
    settingsUpdate('afGain');
    settingsUpdate('filter');
    settingsUpdate('squelch');
    settingsUpdate('toneSquelch');
    settingsUpdate('noiseBlank');
    settingsUpdate('frequency');

	server.start();
};
