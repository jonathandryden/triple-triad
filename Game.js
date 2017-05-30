const Player = require("./Player.js");
const Card = require("./Card.js");

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
    // access num of cards in card db and pick random number in it 5 times
    return [new Card(), new Card(), new Card(), new Card(), new Card()];
  }

  playMove(move) {
    // TODO take a move object and apply
  }

  processBoard() {
    // TODO do calcs here
  }
}

module.exports = Game;
