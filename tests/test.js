var chai = require("chai");
var assert = chai.assert;
var Game = require("../Game.js");
var Card = require("../Card.js");
var Player = require("../Player.js");

describe("Card Class", function() {
  it("Should Create A Card", function() {
    var card = new Card();
    assert.isNotNull(card);
  });
});

describe("Player Class", function() {
  it("Should Create A Player", function() {
    var player = new Player();
    assert.isNotNull(player);
    assert.equal(player.cards.length, 5);
  });
});

describe("Game Class", function(){
  it("Should Create A Game", function(done) {
    var game = new Game();
    assert.isNotNull(game);
    assert.isNotNull(game.board);
    assert.equal(game.board.length, 3);
    assert.equal(game.board[0].length, 3);
    assert.equal(game.board[1].length, 3);
    assert.equal(game.board[2].length, 3);
    assert.equal(game.players.length, 2);
    done();
  });
});
