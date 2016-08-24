var basicAuth = require('basic-auth');

exports.basicUsers = function(userManager, ignoredAuthConfig) {
    if (!ignoredAuthConfig) {
        ignoredAuthConfig = {
            ignoredRanges: ['127.0.0.', '192.168.'],
            ignoredPaths: []
        };
    }

    return function(req, res, next) {
        var ip = req.ip;
        if (ip.includes(':')) {
            ip = ip.substring(ip.lastIndexOf(':') + 1);
            if (ip === "1") {
                ip = "127.0.0.1";
            }
        }
        
        for (var i in ignoredAuthConfig.ignoredRanges) {
            if (ip.startsWith(ignoredAuthConfig.ignoredRanges[i])) return next();
        }

        for (var i in ignoredAuthConfig.ignoredPaths) {
            if (req.url.startsWith(ignoredAuthConfig.ignoredPaths[i])) return next();
        }

        function unauthorized(res) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.sendStatus(401);
        };

        var user = basicAuth(req);

        if (!user || !user.name || !user.pass) {
            return unauthorized(res);
        };

        if (userManager.validateUser(user.name, user.pass)) {
            return next();
        }
        return unauthorized(res);
    };
};