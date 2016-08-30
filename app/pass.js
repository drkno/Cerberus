'use strict';

let EventEmitter = require('events'),
    jspredict = require('jspredict'),
    request = require('request').defaults({jar: true});

module.exports = class PassManager extends EventEmitter {

    /**
     * constructor - creates a new pass manager.
     *
     * @param {string} username space-track username
     * @param {string} password space-track password
     * @param {float} latitude latitude (degrees)
     * @param {float} longitude Longitude (degrees)
     * @param {float} altitude Altitude (km)
     * @param {float} minElevation Minimum elevation allowed for each pass (default is 0).
     * @param {int} maxPassesPerSatellite Maximum number of passes to retreive per each satellite (default is 5).
     * @param {Array} satellites NORAD_CAT_ID of satellites to track. Defaults to NOAA 15, NOAA 18 and NOAA 19.
     */
    constructor(username, password, latitude, longitude, altitude, minElevation = 0, maxPassesPerSatellite = 5, satellites = [25338,28654,33591]) {
        super();
        this.username = username;
        this.password = password;
        this.qth = [latitude, longitude, altitude];
        this.minElevation = minElevation;
        this.maxPassesPerSatellite = maxPassesPerSatellite;
        this.satelliteIds = satellites.join(',');
        this.satelliteCount = satellites.length;
        this.passList = [];
    }

    start() {
        if (this.tleInterval || this.passInterval) {
            throw new Error('Cannot start when already started.');
        }
        const tleTime = 86400000,
            passTime = 3600000;

        this._updateTleList(() => {
            this._updatePassList();
        });
        this.tleInterval = setInterval(this._updateTleList, tleTime);
        this.passInterval = setInterval(this._updatePassList, passTime);
        this.emit('start');
    }

    stop() {
        if (!this.tleInterval || !this.passInterval) {
            throw new Error('Cannot stop when already stopped.');
        }
        clearInterval(this.tleInterval);
        clearInterval(this.passInterval);
        this.tleInterval = null;
        this.passInterval = null;
        this.emit('stop');
    }

    _updateTleList(callback) {
        request.post({url: 'https://www.space-track.org/ajaxauth/login', form: {
            identity: this.username,
            password: this.password,
            query: 'https://www.space-track.org/basicspacedata/query/class/tle_latest/NORAD_CAT_ID/' + this.satelliteIds + '/orderby/ORDINAL%20asc/limit/' + this.satelliteCount + '/metadata/false'
        }}, (error, response, body) => {
            if (error) {
                console.error('Failed to update TLEs.');
                console.log(error);
            }
            else {
                this.satellites = JSON.parse(body);
                console.log('Pass list update complete.');
                if (callback) {
                    callback();
                }
            }
        });
    }

    _updatePassList() {
        let start = new Date(),
            end = new Date(),
            newPassList = [];

        end.setDate(start.getDate()+14);

        for (let satellite of this.satellites) {
            let tle = satellite.TLE_LINE0 + '\n' + satellite.TLE_LINE1 + '\n' + satellite.TLE_LINE2;
            let passes = jspredict.transits(tle, this.qth, start, end, this.minElevation, this.maxPassesPerSatellite);
            for (let pass of passes) {
                pass.name = satellite.OBJECT_NAME;
                newPassList.push(pass);
            }
        }
        newPassList.sort((a, b) => {
            if (a.start < b.start) {
                return -1;
            }
            if (a.start > b.start) {
                return 1;
            }
            return 0;
        });
        this.passList = newPassList;
        this.emit('update', newPassList);
    }

    getPassList () {
        return this.passList;
    }
}
