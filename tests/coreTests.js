"use strict";

const chai      = require("chai"),
      assert    = chai.assert,
      Game      = require("../core/Game.js"),
      Card      = require("../core/Card.js"),
      Player    = require("../core/Player.js"),
      Mock      = require("./mock/Mock.js"),
      Guid      = require("guid");

const drawBoard = function drawBoard(board) {
  let msg = "\r\n_________________________\r\n";
  for (let i = 0; i < 3; i++) {
    msg += "[";
    for (let j = 0; j < 3; j++) {
      if (board[i][j] != undefined) {
        msg += " " + (board[i][j].color === "BLUE" ? "b" : "r") + board[i][j].rank.top
          + board[i][j].rank.right + board[i][j].rank.bottom
          + board[i][j].rank.left + " ";
      } else {
        msg += " xNULL ";
      }
      if (j < 2) {
        msg += "|";
      }
    }
    msg += "]\r\n";
  }
  msg += "-------------------------\r\n";

  console.log(msg);
};

describe("Card Tests", function() {
  it("Should Create A Card", function() {
    let cardProperties =
      {
        "id": 0,
        "name":"Dendrobium",
        "level":1,
        "game":"IX",
        "rank":{
          "top":9,
          "right":1,
          "bottom":1,
          "left":1
        },
        "element": null,
        "color":"RED"
      };

    const card = new Card(cardProperties);
    assert.isNotNull(card);
    assert.equal(card.name, cardProperties.name);
  });
});

describe("Player Tests", function() {
  it("Should Create A Player", function() {
    let playerProperties = {
      name: "Alice",
      number: 1
    };
    let player = new Player(playerProperties);
    assert.isNotNull(player);
    assert.equal(player.name, playerProperties.name);
  });

  it("Should Create A Player With A Hand", function() {
    let playerProperties = Mock.player("RED", 1, 5);
    let player = new Player(playerProperties);
    assert.isNotNull(player);
    assert.equal(player.name, playerProperties.name);
    assert.equal(player.hand.length, 5);
  });
});

describe("Game Tests", function(){
  let mockPlayer1 = Mock.player("RED", 1, 5),
      mockPlayer2 = Mock.player("BLUE", 2, 5);

  it("Should Create A Game", function() {
    var game = new Game();
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    assert.equal(game.board.length, 3);
    assert.equal(game.board[0].length, 3);
    assert.equal(game.board[1].length, 3);
    assert.equal(game.board[2].length, 3);
    assert.equal(game.players.length, 2);
    assert.equal(game.players[0].hand.length, 5);
    assert.equal(game.players[1].hand.length, 5);
  });

  it("Should Play A Card (MOCK)", function(){
    var game = new Game({
      name: "Test Game",
      status: "In Progress",
      playerTurn: 1,
      board: [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
      ],
      players: [
        new Player(mockPlayer1), new Player(mockPlayer2)
      ],
      score: [0, 0]
    });
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    assert.equal(game.players.length, 2);

    assert.equal(game.players[0].hand.length, 5);
    game.playMove(1, game.players[0].hand[0].id, 0, 0);
    assert.isNotNull(game.board[0][0]);
    assert.equal(game.players[0].hand.length, 4);
    assert.equal(game.score[0], 1);
    assert.equal(game.playerTurn, 2);
    assert.isTrue(game.status !== "Game Over");
  });

  it("Should Play A Card And Lose From Right (MOCK)", function(){
    var game = new Game({
      name: "Test Game",
      status: "In Progress",
      playerTurn: 1,
      board: [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
      ],
      players: [
        new Player(Mock.weakPlayer("RED", 1, 5)), new Player(Mock.strongPlayer("BLUE", 2, 5))
      ],
      score: [0, 0]
    });
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    assert.equal(game.players.length, 2);

    assert.equal(game.players[0].hand.length, 5);
    game.playMove(1, game.players[0].hand[0].id, 1, 1);

    assert.equal(game.playerTurn, 2);
    assert.isNotNull(game.board[0][0]);
    assert.equal(game.players[0].hand.length, 4);
    assert.equal(game.score[0], 1);
    assert.isTrue(game.status !== "Game Over");
    game.playMove(2, game.players[1].hand[0].id, 2, 1);

    assert.equal(game.playerTurn, 1);
    assert.isNotNull(game.board[0][1]);
    assert.equal(game.players[1].hand.length, 4);
    assert.equal(game.score[1], 2);
    assert.isTrue(game.status !== "Game Over");

  });

  it("Should Play A Card And Lose From Left (MOCK)", function(){
    var game = new Game({
      name: "Test Game",
      status: "In Progress",
      playerTurn: 1,
      board: [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
      ],
      players: [
        new Player(Mock.weakPlayer("RED", 1, 5)), new Player(Mock.strongPlayer("BLUE", 2, 5))
      ],
      score: [0, 0]
    });
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    assert.equal(game.players.length, 2);

    assert.equal(game.players[0].hand.length, 5);
    game.playMove(1, game.players[0].hand[0].id, 1, 1);

    assert.equal(game.playerTurn, 2);
    assert.isNotNull(game.board[0][0]);
    assert.equal(game.players[0].hand.length, 4);
    assert.equal(game.score[0], 1);
    assert.isTrue(game.status !== "Game Over");
    game.playMove(2, game.players[1].hand[0].id, 0, 1);

    assert.equal(game.playerTurn, 1);
    assert.isNotNull(game.board[0][1]);
    assert.equal(game.players[1].hand.length, 4);
    assert.equal(game.score[1], 2);
    assert.isTrue(game.status !== "Game Over");

  });

  it("Should Play A Card And Lose From Top (MOCK)", function(){
    var game = new Game({
      name: "Test Game",
      status: "In Progress",
      playerTurn: 1,
      board: [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
      ],
      players: [
        new Player(Mock.weakPlayer("RED", 1, 5)), new Player(Mock.strongPlayer("BLUE", 2, 5))
      ],
      score: [0, 0]
    });
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    assert.equal(game.players.length, 2);

    assert.equal(game.players[0].hand.length, 5);
    game.playMove(1, game.players[0].hand[0].id, 1, 1);

    assert.equal(game.playerTurn, 2);
    assert.isNotNull(game.board[0][0]);
    assert.equal(game.players[0].hand.length, 4);
    assert.equal(game.score[0], 1);
    assert.isTrue(game.status !== "Game Over");
    game.playMove(2, game.players[1].hand[0].id, 1, 0);

    assert.equal(game.playerTurn, 1);
    assert.isNotNull(game.board[0][1]);
    assert.equal(game.players[1].hand.length, 4);
    assert.equal(game.score[1], 2);
    assert.isTrue(game.status !== "Game Over");

  });

  it("Should Play A Card And Lose From Bottom (MOCK)", function(){
    var game = new Game({
      name: "Test Game",
      status: "In Progress",
      playerTurn: 1,
      board: [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
      ],
      players: [
        new Player(Mock.weakPlayer("RED", 1, 5)), new Player(Mock.strongPlayer("BLUE", 2, 5))
      ],
      score: [0, 0]
    });
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    assert.equal(game.players.length, 2);

    assert.equal(game.players[0].hand.length, 5);
    game.playMove(1, game.players[0].hand[0].id, 1, 1);

    assert.equal(game.playerTurn, 2);
    assert.isNotNull(game.board[0][0]);
    assert.equal(game.players[0].hand.length, 4);
    assert.equal(game.score[0], 1);
    assert.isTrue(game.status !== "Game Over");
    game.playMove(2, game.players[1].hand[0].id, 1, 2);

    assert.equal(game.playerTurn, 1);
    assert.isNotNull(game.board[0][1]);
    assert.equal(game.players[1].hand.length, 4);
    assert.equal(game.score[1], 2);
    assert.isTrue(game.status !== "Game Over");

  });

  it("Should Play A Card And Win All Sides (MOCK)", function(){
    var game = new Game({
      name: "Test Game",
      status: "In Progress",
      playerTurn: 1,
      board: Mock.losingBoard(),
      players: [
        new Player(Mock.strongPlayer("RED", 1, 5)), new Player(Mock.weakPlayer("BLUE", 2, 5))
      ],
      score: [0, 0]
    });
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    assert.equal(game.players.length, 2);

    assert.equal(game.players[0].hand.length, 5);
    game.playMove(1, game.players[0].hand[0].id, 1, 1);

    assert.equal(game.playerTurn, 2);
    assert.equal(game.score[0], 5);
    assert.isTrue(game.status !== "Game Over");
  });

  it("Should Play A Card And Game Over (MOCK)", function(){
    var game = new Game({
      name: "Test Game",
      status: "In Progress",
      playerTurn: 1,
      board: Mock.fullBoard(),
      players: [
        new Player(Mock.strongPlayer("RED", 1, 5)), new Player(Mock.weakPlayer("BLUE", 2, 5))
      ],
      score: [0, 0]
    });
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    assert.equal(game.players.length, 2);

    assert.equal(game.players[0].hand.length, 5);
    game.playMove(1, game.players[0].hand[0].id, 2, 2);

    assert.equal(game.playerTurn, 2);
    assert.equal(game.status, "Game Over");
  });
});
