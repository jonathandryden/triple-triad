var Player = require("./Player.js");

class Game {
  constructor() {
    this.name = "Triple Triad";
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.players = [new Player(1, []), new Player(2, [])];
  }
}

module.exports = Game;
