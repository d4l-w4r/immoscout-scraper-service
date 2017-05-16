const fs = require('fs');
const timeStamp = require('time-stamp');
const _ = require('underscore');


/*
* Quick and dirty "database" implementation based on a json file as backend.
* Supports simply adding and deleting of entries
*/
module.exports.Store = function() {
  /* Private fields */
  var storePath = "./storage/storage.json";
  var store = {};

  /*Private methods*/
  var saveDB = function() {
    fs.writeFile(storePath, JSON.stringify(store), function (err) {
      if (err) return console.log(err);
    });
  };

  var initDB = function() {
    store = {'db': {}, 'iterator': []};

    if (fs.existsSync(storePath)) {
      data = fs.readFileSync(storePath, {"encoding": "utf8"});
      if (data != "") {
        store = JSON.parse(data);
      }
    }
    saveDB();
  }();

  var writeEntry = function (entry) {
    store.db[entry['id']] = entry;
    store.iterator.push(entry);
  }

  /*Public methods*/
  this.getStorage = function() {
    return store;
  };

  this.addEntry = function(entry) {
    _id = entry['id']
    if(_.has(store.db, _id)) {
      console.log("ERROR: The item you tried to save seems to have the same ID as an item already present in the DB.");
    } else {
      entry['scraper-timestamp'] = timeStamp("YYYY:MM:DD:HH:mm:ss");
      writeEntry(entry);
      saveDB();
    }
  };

  this.addEntries = function(entries) {
    var uniqueEntries = _.filter(entries, function(entry) {
       return !_.has(store.db, entry['id'])
     });
     console.log("Adding " + uniqueEntries.length + " new entries");
    _.each(uniqueEntries, function (entry) {
      entry['scraper-timestamp'] = timeStamp("YYYY:MM:DD:HH:mm:ss");
      writeEntry(entry);
    });
    saveDB();
    return uniqueEntries.length;
  }

  this.getEntry = function(id) {
    return JSON.parse(JSON.stringify(store.db[id]));
  }

  this.getEntries = function() {
    return JSON.parse(JSON.stringify(store.iterator));
  };

};
