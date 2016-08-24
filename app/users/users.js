'use strict';

﻿module.exports = class {
    constructor (usersFile, alg) {
        if (!usersFile) {
            usersFile = "../../users.json";
        }
        try {
            this.users = require(usersFile);
        }
        catch (e) {
            this.users = [];
        }

        if (!alg) {
            alg = 'sha512';
        }
        this.alg = require(alg);
    }

    validateUser (username, password) {
        password = this.alg(password).toString('hex');
        let f = this.users.filter((user) => {
            return user.username === username && user.password === password;
        });
        return f.length === 1;
    }

    getUserList() {
        return this.users.map((user) => {
            return user.username;
        });
    }
};
