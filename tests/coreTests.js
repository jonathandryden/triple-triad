"use strict";

const chai      = require("chai"),
      assert    = chai.assert,
      Game      = require("../core/Game.js"),
      Card      = require("../core/Card.js"),
      Player    = require("../core/Player.js"),
      mockCards = require("./mock/cards.json");

const drawBoard = function(board) {
  let msg = "\r\n_________________________\r\n";
  for (let i = 0; i < 3; i++) {
    msg += "[";
    for (let j = 0; j < 3; j++) {
      if (board[i][j] != undefined) {
        msg += " " + (board[i][j].color ? "b" : "r") + board[i][j].rank.top
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
}

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
    let playerProperties = {
      name: "Alice",
      number: 1,
      hand: [
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
        },
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
        }
      ]
    };
    let player = new Player(playerProperties);
    assert.isNotNull(player);
    assert.equal(player.name, playerProperties.name);
    assert.equal(player.hand.length, 2);
  });
});

describe("Game Tests", function(){
  let mockPlayer1 = {
      name: "Alice",
      number: 1,
      hand: [
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
        },
        {
          "id": 1,
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
        }
      ]
    },
    mockPlayer2 = {
      name: "Bob",
      number: 2,
      hand: [
        {
          "id": 2,
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
          "color":"BLUE"
        },
        {
          "id": 3,
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
          "color":"BLUE"
        }
      ]
    };
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
        [],
        [],
        []
      ],
      players: [
        new Player(mockPlayer1), new Player(mockPlayer2)
      ],
      score: [0, 0]
    });
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    assert.equal(game.players.length, 2);

    game.playMove(1, 0, 0, 0);
    assert.isNotNull(game.board[0][0]);
    assert.equal(game.players[0].hand.length, 1);
    assert.equal(game.score[0], 1);
    assert.isTrue(game.status !== "Game Over");
  });

  it("Should complete a board", function(){
    var game = new Game();
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    var card = mockCards[0];
    game.placeCard(card, {"x":1,"y":1}); // 9111
    card = mockCards[1];
    card.color = true;
    game.placeCard(card, {"x":0, "y":1}); // 1911
    card = mockCards[11];
    game.placeCard(card, {"x":2,"y":0}); // 1111
    card.color = true;
    game.placeCard(card, {"x":0,"y":0});
    card.color = false;
    game.placeCard(card, {"x": 2, "y": 2});
    card.color = true;
    game.placeCard(card, {"x":0, "y": 2});
    card = mockCards[10];
    game.placeCard(card, {"x":2, "y":1}); // 9999
    card.color = true;
    game.placeCard(card, {"x":1, "y": 0});
    card.color = false;
    game.placeCard(card, {"x":1, "y": 2});
    assert.equal(game.score[0], 8);
    assert.equal(game.score[1], 1);
    assert.isTrue(game.isGameOver);
  });
});
