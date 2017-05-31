const chai = require("chai");
const assert = chai.assert;
const Game = require("../Game.js");
const Card = require("../Card.js");
const Player = require("../Player.js");
const mockCards = require("./mock/cards.json");

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
    var player = new Player(1, [undefined, undefined, undefined, undefined, undefined]);
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
  });
});
