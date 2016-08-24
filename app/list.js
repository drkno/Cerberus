var Datastore = require('nedb'),
  path = require('path'),
  fs = require('fs');

var Manager = module.exports = function(database) {
  if (!database) {
    database = 'data.db';
  }
  database = path.join(__dirname, './../', database);
  database = path.resolve(database);
  this.store = new Datastore({filename:database, autoload:true});
  this.newList();
};

Manager.prototype.current = function (callback) {
	var id = this.currId;
	this.store.findOne({_id: id}, function(err, obj) {
		if (err) {
			throw err;
		}
		callback(obj);
	});
};

Manager.prototype.addItem = function (item) {
	var id = this.currId;
	this.store.update({_id: id}, {$push: {items: item}}, {}, function(){});
};

Manager.prototype.replaceItem = function(oldItem, newItem) {
    var id = this.currId;
    this.store.update({ _id: id }, { $pull: { items: oldItem }, $push: { items: newItem } }, {}, function (err, obj) {
        if (err) {
            throw err;
        }
    });
};

Manager.prototype.removeItem = function (item) {
	var id = this.currId;
	this.store.update({_id: id}, {$pull: {items: item}}, {}, function(err, obj){
		if (err) {
		    throw err;
        }
	});
};

Manager.prototype.newList = function () {
	var cfg = require('./../config.json');
	var xthis = this;

	if (!xthis.currId && cfg.current) {
		xthis.currId = cfg.current;
		return;
	}

	var newList = {
		items: []
	};

	this.store.insert(newList, function (err, id) {
		xthis.currId = id._id;
		cfg.current = id._id;
		fs.writeFileSync('config.json', JSON.stringify(cfg, null, 2));
	});
};

Manager.prototype.getItems = function(callback) {
    this.store.find({}, function (err, res) {
        if (err) {
            throw err;
        }
        
        // get all items
        var tota = 0;
        var tots = [];
        var coll = [];
        for (var i = 0; i < res.length; i++) {
            coll = coll.concat(res[i].items);
            tots.push(res[i].items.length);
            tota += res[i].items.length;
        }
        
        // to title case and unique
        var temp = {};
        var result = [];
        for (var j = 0; j < coll.length; j++) {
            var key = coll[j].name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            if (!temp[key]) {
                temp[key] = 1;
            } else {
                temp[key]++;
            }
        }
        for (var i in temp) {
            result.push([i, temp[i]]);
        }
        
        // sort by frequency and alphabet
        result = result.sort(function(a, b) {
            var res = b[1] - a[1];
            if (res !== 0) return res;
            if (a[0] > b[0]) return 1;
            if (a[0] < b[0]) return -1;
            return 0;
        });

        callback({
            items: result,
            total: tota,
            shops: tots
        });
    });
};