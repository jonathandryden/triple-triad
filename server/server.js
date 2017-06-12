let IO = undefined;
const Logger = require("./Logger.js"),
User = require("./User.js"),
Game = require("../core/Game.js"),
Player = require("../core/Player.js"),
DataStorageClient = require("./DataStorageClient.js");

// routes
var createGame = function(names) {
  let sock = this;
  DataStorageClient.FindGameByName(names.game, function(game) {
    if (!game) {
      game = new Game();
      game.name = names.game;
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

var joinGame = function(names) {
  let sock = this;
  DataStorageClient.FindGameByName(names.game, function(game) {
    console.dir(game.players);
    if (!game) {
      Logger.warn(`Tried to find a game with the name of ${names.game}. But`
        + ` game was not found.`);
    }
    if (game && !game.players[1].name) {
      console.log('undefined');
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

var playMove = function(move) {
  /*TODO: move {
            gameName
            playerName
            cardId/name
            Position
          }
  */
  console.dir(move);
  console.dir(move.position);
  
  var sock = this;
  DataStorageClient.FindGameByName(move.gameName, function(game) {
    if (!game) {
      Logger.warn(`Tried to find a game with the name of ${names.game}. But`
        + ` game was not found.`);
      return;
    }

    let playerNumber = move.player;
    card = game.players[playerNumber].cards[move.cardId],
    cardIndex = move.cardId;

    var status = game.placeCard(card, move.position);

    if (status === 1) {
      Logger.warn(`Tried to play a card in an invalid position. `
        + `(${move.position.x}, ${move.position.y})`);
      return;
    }

    array.splice(index, 1);

    IO.sockets.in(game.name).emit("updateGame", game);
  });
}

module.exports = function(io) {
  IO = io;

  // generate user -> username, roomname
  //  if new user/room make a new room with a new game
  //   on a new game wait for 2 players

  IO.on("connection", function(socket){
    Logger.log("User connected.");

    let user = new User(socket.id);

    IO.emit("sesh", socket.id);
    socket.on("disconnect", function(){
      Logger.log("User disconncted");
    });
    socket.on("client", function(d) {
      console.dir(d);
    });
    socket.on("find", function(name) {
      DataStorageClient.FindGameByName(name);
    });
    socket.on("create", createGame);
    socket.on("join", joinGame);
    socket.on("placeCard", playMove);
  });
}
