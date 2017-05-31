var Player = require("./Player.js");
var Card = require("./Card.js");
var CardDb = require("./cards.json");

class Game {
  constructor() {
    this.name = "Triple Triad";
    this.board = [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined]
    ];
    this.players = [new Player(1, this.generateCards(1)), new Player(2, this.generateCards(2))];
    this.score = [0, 0];
  }

  generateCards(player) {
    // TODO redo this
    var generatedCards = [];
    for(var i = 0; i<5; i++) {
      var randomId = Math.floor((Math.random() * 10));
      for (var j = 0, len = CardDb.length; j<len; j++){
        if (CardDb[j].id === randomId) {
          var card = new Card(CardDb[j]);
          if (player === 2) {
            card.color = true;
          }
          generatedCards.push(card);
        }
      }
    }
    return generatedCards;
  }

  placeCard(card, location) {
    if (this.board[location.y][location.x] != undefined) {
      return 1;
    }

    this.board[location.y][location.x] = card;

    var opposingCard = undefined;
    // check top
    if (location.y - 1 >= 0) {
      opposingCard = this.board[location.y - 1][location.x];
      if (opposingCard != undefined && opposingCard.color != card.color) {
        if (card.rank.top > opposingCard.rank.bottom) {
          opposingCard.color = card.color;
        }
      }
    }

    // check right
    if (location.x + 1 <= 2) {
      opposingCard = this.board[location.y][location.x + 1];
      if (opposingCard != undefined && opposingCard.color != card.color) {
        if (card.rank.right > opposingCard.rank.left) {
          opposingCard.color = card.color;
        }
      }
    }

    // check bottom
    if (location.y + 1 <= 2) {
      opposingCard = this.board[location.y + 1][location.x];
      if (opposingCard != undefined && opposingCard.color != card.color) {
        if (card.rank.bottom > opposingCard.rank.top) {
          opposingCard.color = card.color;
        }
      }
    }

    // check left
    if (location.x - 1 >= 0) {
      opposingCard = this.board[location.y][location.x - 1];
      if (opposingCard != undefined && opposingCard.color != card.color) {
        if (card.rank.left > opposingCard.rank.right) {
          opposingCard.color = card.color;
        }
      }
    }

    this.updateScore();
    return 0;
  }

  updateScore() {
    this.score = [0, 0];

    for (var i = 0, len = this.board.length; i < len; i++) {
      for (var j = 0, len2 = this.board[i].length; j < len; j++) {
        if (this.board[i][j]) {
          if (this.board[i][j].color) {
            this.score[1]++;
          } else {
            this.score[0]++;
          }
        }
      }
    }
    // TODO end game?
  }
}

module.exports = Game;
