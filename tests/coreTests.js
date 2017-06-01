"use strict";

const chai = require("chai");
const assert = chai.assert;
const Game = require("../core/Game.js");
const Card = require("../core/Card.js");
const Player = require("../core/Player.js");
const mockCards = require("./mock/cards.json");

var drawBoard = function(board) {
  var msg = "_________________________\r\n";
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
  msg += "-------------------------";

  console.log(msg);
}

describe("Card Class", function() {
  it("Should Create A Card", function() {
    var card = new Card({
      "id": 0,
      "color": "red",
      "attr": null,
      "power": {
        "top": 1,
        "right": 2,
        "bottom": 3,
        "left": 4
      },
      "img": "test.png"
    });
    assert.isNotNull(card);
  });
});

describe("Player Class", function() {
  it("Should Create A Player", function() {
    var player = new Player(1
      , [undefined, undefined, undefined, undefined, undefined]);
    assert.isNotNull(player);
    assert.equal(player.cards.length, 5);
  });
});

describe("Game Class", function(){
  it("Should Create A Game", function() {
    var game = new Game();
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    assert.equal(game.board.length, 3);
    assert.equal(game.board[0].length, 3);
    assert.equal(game.board[1].length, 3);
    assert.equal(game.board[2].length, 3);
    assert.equal(game.players.length, 2);
    assert.equal(game.players[0].cards.length, 5);
    assert.equal(game.players[1].cards.length, 5);
  });

  it("Should Play A Card (MOCK)", function(){
    var game = new Game();
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    var weakBottom = mockCards[1];
    game.placeCard(weakBottom, {"x":0, "y":0});
    var topStrong = mockCards[0];
    topStrong.color = true;
    game.placeCard(topStrong, {"x":0, "y":1});
    assert.isNotNull(game.board[0][0]);
    assert.isNotNull(game.board[1][0]);
    assert.equal(game.score[1], 2);
    assert.isFalse(game.isGameOver);
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
