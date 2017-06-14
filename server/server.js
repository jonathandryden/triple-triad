let IO = undefined;
const Logger = require("./Logger.js"),
User = require("./User.js"),
Game = require("../core/Game.js"),
Player = require("../core/Player.js"),
DataStorageClient = require("./DataStorageClient.js");

// utilities
var gameCleanUp = function() {
  Logger.log("CLEANUP - Archiving");
  DataStorageClient.Archive(function() {
    Logger.log("CLEANUP - Deleting");
    DataStorageClient.GarbageCollector(function() {
      setTimeout(gameCleanUp, (1000 * 60 * 60));
    });
  });
}

// routes
var createGame = function(data) {
  let names = JSON.parse(data),
  sock = this;

  DataStorageClient.FindGameByName(names.game, function(game) {
    if (!game) {
      game = new Game();
      game.name = names.game;
      game.isGameOver = false;
      game.players[0].name = names.player;

      DataStorageClient.AddGame(game);

      sock.join(game.name);

      Logger.log(`Created a game with the name of ${game.name}`);

      IO.sockets.in(game.name).emit("updateGame", game);
    } else {
      Logger.warn(`Tried to create a game with the name of ${names.game}. But`
        + ` game with that name already exists`);
    }
  });
}

var joinGame = function(data) {
  let names = JSON.parse(names),
  sock = this;

  DataStorageClient.FindGameByName(names.game, function(game) {
    // console.dir(game.players);
    if (!game) {
      Logger.warn(`Tried to find a game with the name of ${names.game}. But`
        + ` game was not found.`);
    }
    if (game && !game.players[1].name) {
      // console.log('undefined');
      game.players[1].name = names.player;

      sock.join(game.name);

      IO.sockets.in(game.name).emit("updateGame", game);
    }
    /*
    else if (game && game.players[1].name === null) {
      // make the player
      game.players[1].name = names.player;
      // TODO: emit board
    } else if (game && (game.players[0].name === names.player
        || game.players[1].name === names.player)) {
      // await turn
      // TODO: emit board
    } else {
      Logger.warn(`Tried to join a game with the name of ${names.game}. But`
        + ` was not one of the players`);
    }
    */
  });
}

var playMove = function(data) {
  let move = JSON.parse(data),
  sock = this;

  DataStorageClient.FindGameByName(move.gameName, function(game) {
    if (!game) {
      Logger.warn(`Tried to find a game with the name of ${names.game}. But`
        + ` game was not found.`);
      return;
    }
    if (game.isGameOver) {
      // TODO: throw error
      Logger.log("Game is Over");
      return;
    }

    game.placeCard(move.player, move.cardId, move.position, function(err, result) {
      if (err) {
        console.log(err.message);
      } else {
        DataStorageClient.UpdateGame(game, function() {
          IO.sockets.in(game.name).emit("updateGame", game);
        });
      }
    });
  });
}

module.exports = function(io) {
  IO = io;
  
  gameCleanUp();

  IO.on("connection", function(socket){
    Logger.log("User connected.");
    socket.on("disconnect", function(){
      Logger.log("User disconncted");
    });

    socket.on("create", createGame);
    socket.on("join", joinGame);
    socket.on("placeCard", playMove);
  });
}
