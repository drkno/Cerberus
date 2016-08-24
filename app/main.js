var Server = require('./server/serve.js'),
    ListManager = require('./list.js'),
    UserManager = require('./users/users.js'),
    extend = require('util')._extend;

var setupServer = function(config) {
    var userManager = new UserManager(config.usersFile, config.passwordAlgorithm);
    var eventsRoot = config.eventsRoot ? config.eventsRoot : '/wudhagh-ws-events';
    return new Server(config.port, config.htmlRoot, eventsRoot, userManager, config.authentication);
};

exports.run = function(config) {
    var server = setupServer(config),
        manager = new ListManager(config.datastore);

    server.apiGet('new', function () {
        manager.newList();
        return true;
    });

	server.apiGet('current', function (req, res) {
	    manager.current(function(obj) {
		    res.send(obj);
	    });
	});

	server.apiPost('addItem', function (req) {
		manager.addItem(req.body.newItem);
        return true;
	});

	server.apiPost('removeItem', function (req) {
		manager.removeItem(req.body.removeItem);
        return true;
    });

    server.apiPost('updateItem', function(req) {
        manager.replaceItem(req.body.oldItem, req.body.newItem);
        return true;
    });

    server.apiGet('itemsList', function(req, res) {
        manager.getItems(function (obj) {
            res.send(obj);
        });
    });

    server.on('swipeLeft', function (data, socket) {
        var o = JSON.parse(data);
        var n = extend({}, o);
        n.purchased = true;
        manager.replaceItem(o, n);
        socket.broadcast.emit('swipeLeft', n);
        return true;
    });
    
    server.on('swipeRight', function (data, socket) {
        var o = JSON.parse(data);
        var n = extend({}, o);
        n.purchased = false;
        manager.replaceItem(o, n);
        socket.broadcast.emit('swipeRight', n);
        return true;
    });

	server.start();
};
