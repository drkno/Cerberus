'use strict';

let Server = require('./server/serve.js'),
    UserManager = require('./users/users.js'),
    PcrControl = require('./pcr/PcrControl.js'),
    PcrNetworkClient = require('./pcr/PcrNetworkComm.js'),
    PassManager = require('./pass.js'),
    fs = require('fs'),
    path = require('path'),
    blankCallback = () => {};

let setupServer = (config) => {
    let userManager = new UserManager(config.usersFile, config.passwordAlgorithm),
        eventsRoot = config.eventsRoot ? config.eventsRoot : '/cerberus-ws-events';
    return new Server(config.port, config.htmlRoot, eventsRoot, userManager, config.authentication);
};

let initialise = (control, settings) => {
    if (settings.power) {
        control.PcrPowerUp(blankCallback);
    }
    else {
        control.PcrPowerDown(blankCallback);
    }
    control.PcrSetMode(settings.mode, blankCallback);
    control.PcrSetVolume(settings.afGain, blankCallback);
    control.PcrSetFilterN(parseInt(settings.filter.substr(0, settings.filter.indexOf('k'))), blankCallback);
    control.PcrSetSquelch(settings.squelch, blankCallback);
    control.PcrSetToneSqN(parseFloat(settings.toneSquelch.substr(0, settings.toneSquelch.indexOf(' '))), blankCallback);
    control.PcrSetNb(settings.noiseBlank, blankCallback);
    control.PcrSetFreq(settings.frequency, blankCallback);
};

let setupRadio = (config, settings) => {
    let uri = config.radioControlHost,
        port = config.radioControlPort || 4456
    if (!uri || typeof port !== 'number') {
        throw new Error('Radio settings are invalid.');
    }
    let comm = new PcrNetworkClient(uri, port),
        control = new PcrControl(comm, () => {
            initialise(control, settings);
        });
    return control;
};

let setupPassManager = (config) => {
    let altitude = config.altitude,
        latitude = config.latitude,
        longitude = config.longitude,
        username = config['space-track-username'],
        password = config['space-track-password'];

    if (!altitude || !latitude || !longitude || !username || !password) {
        throw new Error('Cannot generate pass list...');
    }
    let passManager = new PassManager(username, password, latitude, longitude, altitude);
    passManager.start();
    return passManager;
};

exports.run = (config) => {
    let server = setupServer(config),
        settings = {
            power: false,
            mode: 'AM',
            filter: '3k',
            toneSquelch: 'Off',
            afGain: 50,
            squelch: 00,
            noiseBlank: false,
            frequency: 101000000,
            audioUrl: config.radioAudioUrl
        },
        control = setupRadio(config, settings),
        passManager = setupPassManager(config);


    let curr = (socket) => {
        socket.emit('current', {
            settings: settings,
            passList: passManager.getPassList()
        });
    };
    server.on('connect', curr);
    server.on('current', curr);

    passManager.on('update', (passList) => {
        server.emit('passList', {passList: passList});
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

    let settingsUpdate = (type, control) => {
        server.on(type, (socket, data) => {
            settings[type] = data[type];
            socket.broadcast.emit(type, data);
            control(data[type]);
        });
    };

    settingsUpdate('power', (val) => {
        if (val) {
            initialise(control, settings);
        }
        else {
            control.PcrPowerDown(blankCallback);
        }
    });

    settingsUpdate('mode', (val) => {
        control.PcrSetMode(val, blankCallback);
    });

    settingsUpdate('afGain', (val) => {
        control.PcrSetVolume(val, blankCallback);
    });

    settingsUpdate('filter', (val) => {
        let value = 0;
        if (val.indexOf('k')) {
            value = parseInt(val.substr(0, val.indexOf('k')));
        }
        control.PcrSetFilterN(value, blankCallback);
    });

    settingsUpdate('squelch', (val) => {
        control.PcrSetSquelch(val, blankCallback);
    });

    settingsUpdate('toneSquelch', (val) => {
        let value = 0;
        if (val.indexOf('Hz')) {
            value = parseFloat(val.substr(0, val.indexOf(' ')));
        }
        control.PcrSetToneSqN(value, blankCallback);
    });

    settingsUpdate('noiseBlank', (val) => {
        control.PcrSetNb(val, blankCallback);
    });

    settingsUpdate('frequency', (val) => {
        control.PcrSetFreq(val, blankCallback);
    });

    setInterval(() => {
        if (settings.power) {
            control.PcrSigStrength((strength) => {
                let s = strength / 255.0;
                server.emit('signal', { signal: s });
            });
        }
        else {
            server.emit('signal', { signal: 0 });
        }
    }, 1000);

	server.start();
};
