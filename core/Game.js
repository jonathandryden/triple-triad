const Player = require("./Player.js"),
Card = require("./Card.js"),
CardDb = require("./cards.json"),
Errors = require("./Errors");

// utilities
var hasEmptyCells = function(board) {
  for (let i = 0, len = board.length; i < len; i++) {
    for (let j = 0, len2 = board[i].length; j < len2; j++) {
      if (!board[i][j]) return true;
    }
  }
  return false;
}

var numberOfCards = function(cards) {
  let result = 0;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i]) {
      result++;
    }
  }
  return result;
}

var compareCards = function(card, dir, opposingCard, def) {
  if (opposingCard) {
    if (opposingCard.color != card.color && card.rank[dir] > opposingCard.rank[def]) {
      opposingCard.color = card.color;
    }
  }
}

class Game {
  constructor(game) {
    if (game) {
      this.name = game.name;
      this.isGameOver = game.isGameOver;
      this.board = game.board;
      this.players = game.players;
      this.score = game.score;
    } else {
      this.name = "Triple Triad";
      this.isGameOver = false;
      this.board = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
      ];
      this.players = [new Player(1, this.generateCards(1))
        , new Player(2, this.generateCards(2))];
      this.score = [0, 0];
    }
  }

  generateCards(player) {
    var generatedCards = [];
    for (let i = 0; i<5; i++) {
      var randomId = Math.floor((Math.random() * 10));
      for (let j = 0, len = CardDb.length; j<len; j++){
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

  placeCard(player, cardIndex, location, callBack) {
    let x = Number(location.x),
    y = Number(location.y),
    card = null;

    if ((numberOfCards(this.players[0].cards) === numberOfCards(this.players[1].cards) && Number(player) !== 0) 
    || (numberOfCards(this.players[0].cards) < numberOfCards(this.players[1].cards) && Number(player) !== 1)) {
      callBack(new Errors.InvalidAction("It is not your turn to move."));
      return;
    }

    if (this.board[y][x] != undefined) {
      callBack(new Errors.InvalidAction("This area of the field is occupied already."));
      return;
    }

    card = this.players[player].cards[cardIndex];
    
    if (!card) {
      callBack(new Errors.InvalidAction("The card played does not exist in the players hand."));
      return;
    }

    this.board[y][x] = card;
    this.players[player].cards[cardIndex] = undefined;
    
    var opposingCard = undefined;

    // check top
    if (y - 1 >= 0) {
      compareCards(card, "top", this.board[y-1][x], "bottom");
    }

    // check right
    if (x + 1 <= 2) {
      compareCards(card, "right", this.board[y][x + 1], "left");
    }

    // check bottom
    if (y + 1 <= 2) {
      compareCards(card, "bottom", this.board[y+1][x], "top");
    }

    // check left
    if (x - 1 >= 0) {
      compareCards(card, "left", this.board[y][x-1], "right");
    }

    this.updateScore();

    callBack(null, this.score);
  }

  updateScore() {
    this.score = [0, 0];

    for (let i = 0, len = this.board.length; i < len; i++) {
      for (let j = 0, len2 = this.board[i].length; j < len; j++) {
        if (this.board[i][j]) {
          if (this.board[i][j].color) {
            this.score[1]++;
          } else {
            this.score[0]++;
          }
        }
      }
    }

    if (!hasEmptyCells(this.board)) this.isGameOver = true;
  }
}

module.exports = Game;
