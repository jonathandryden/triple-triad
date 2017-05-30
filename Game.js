var Player = require("./Player.js");
var Card = require("./Card.js");

class Game {
  constructor() {
    this.name = "Triple Triad";
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.players = [new Player(1, this.generateCards()), new Player(2, this.generateCards())];
  }

  generateCards() {
    return [new Card(), new Card(), new Card(), new Card(), new Card()];
  }
}

module.exports = Game;
