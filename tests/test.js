var chai = require("chai");
var assert = chai.assert;
var Game = require("../Game.js");

describe("Game Class", function(){
  it("Should Create A Game", function(done) {
    var temp = new Game();
    assert.isNotNull(temp);
    assert.isNotNull(temp.board);
    assert.equal(temp.board.length, 3);
    assert.equal(temp.board[0].length, 3);
    assert.equal(temp.board[1].length, 3);
    assert.equal(temp.board[2].length, 3);
    done();
  });
});
