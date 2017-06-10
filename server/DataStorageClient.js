const MongoClient = require("mongodb"),
Game = require("../core/Game.js"),
Logger = require("./Logger.js"),
config = require("./config.js"),
url = config.mongo.url,
gameCollection = config.mongo.GameCollection;

class DataStorageClient{
  AddGame(game) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        Logger.error(err);
        return;
      }
      var collection = db.collection(gameCollection);
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
      var collection = db.collection(gameCollection);
      collection.find({"game.name":name}).toArray(function(err, docs) {
        if (err) {
          Logger.error(err);
          db.close();
          return;
        }
        db.close();
        if (docs.length > 0) {
            cb(new Game(docs[0].game));
        } else {
          cb();
        }
      });
    });
  }

  UpdateGame(game) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        Logger.error(err);
        return;
      }
      var collection = db.collection(gameCollection);
      collection.updateOne({"game.name":game.name}, {game:game}, function(err, result) {
        if (err) {
          Logger.error(err);
        }
      });
    });
  }
}

module.exports = new DataStorageClient();
