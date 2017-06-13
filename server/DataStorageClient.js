const MongoClient = require("mongodb"),
Game = require("../core/Game.js"),
Logger = require("./Logger.js"),
config = require("./config.js"),
url = config.mongo.url;

class DataStorageClient{
  AddGame(game) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        Logger.error(err);
        return;
      }
      var collection = db.collection(config.mongo.GameCollection);
      collection.insert({game: game}, function(err, result) {
        if (err) {
          Logger.error(err);
        }
        db.close();
      });
    });
  }

  FindGameByName(name, cb) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        Logger.error(err);
        return;
      }
      var collection = db.collection(config.mongo.GameCollection);
      collection.find({"game.name":name}).toArray(function(err, docs) {
        if (err) {
          Logger.error(err);
          db.close();
        } else {
          db.close();
          if (docs.length > 0) {
              cb(new Game(docs[0].game));
          } else {
            cb();
          }
        }
      });
    });
  }

  UpdateGame(game, cb) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        Logger.error(err);
        return;
      }
      var collection = db.collection(config.mongo.GameCollection);
      collection.updateOne({"game.name":game.name}, {game:game}, function(err, result) {
        if (err) {
          Logger.error(err);
        }
        cb();
      });
    });
  }

  Archive(cb) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        Logger.error(err);
        return;
      }
      var collection = db.collection(config.mongo.GameCollection);
      collection.find({"game.isGameOver":true}).toArray(function(err, docs) {
        if (docs.length > 0) {
          var archiveCollection = db.collection(config.mongo.GameHistoryCollection);
          archiveCollection.insertMany(docs, function(err, res) {
            if (err) {
              Logger.error(err);
              cb();
            } else {
              collection.deleteMany({"game.isGameOver":true}, function(err, docs) {
                if (err) {
                  Logger.error(err);
                }
                
                cb();
              });
            }
          });
        }
      });
    });
  }
}

module.exports = new DataStorageClient();
