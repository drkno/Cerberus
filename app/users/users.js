var sha512 = require('sha512');

var UserManager = function (usersFile, alg) {
    if (!usersFile) {
        usersFile = "../../users.json";
    }
    this.users = require(usersFile);

    if (!alg) {
        alg = 'sha512';
    }
    this.alg = require(alg);
};

UserManager.prototype.validateUser = function(username, password) {
    password = this.alg(password).toString('hex');
    var f = this.users.filter(function (user) {
        return user.username === username && user.password === password;
    });
    return f.length > 0;
};

module.exports = UserManager;