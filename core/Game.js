"use strict";

const Player = require("./Player.js");
const Card = require("./Card.js");
const CardDb = require("./cards.json");

var hasEmptyCells = function(board) {
  for (let i = 0, len = board.length; i < len; i++) {
    var index = board[i].indexOf();
    if (index !== -1) return true;
  }
  return false;
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

  placeCard(card, location) {
    let x = Number(location.x),
    y = Number(location.y);

    if (this.board[y][x] != undefined) {
      return 1;
    }
    
    this.board[y][x] = card;

    var opposingCard = undefined;
    // check top
    if (y - 1 >= 0) {
      opposingCard = this.board[y - 1][x];
      if (opposingCard != undefined && opposingCard.color != card.color) {
        if (card.rank.top > opposingCard.rank.bottom) {
          opposingCard.color = card.color;
        }
      }
    }

    // check right
    if (x + 1 <= 2) {
      opposingCard = this.board[y][x + 1];
      if (opposingCard != undefined && opposingCard.color != card.color) {
        if (card.rank.right > opposingCard.rank.left) {
          opposingCard.color = card.color;
        }
      }
    }

    // check bottom
    if (y + 1 <= 2) {
      opposingCard = this.board[y + 1][x];
      if (opposingCard != undefined && opposingCard.color != card.color) {
        if (card.rank.bottom > opposingCard.rank.top) {
          opposingCard.color = card.color;
        }
      }
    }

    // check left
    if (x - 1 >= 0) {
      opposingCard = this.board[y][x - 1];
      if (opposingCard != undefined && opposingCard.color != card.color) {
        if (card.rank.left > opposingCard.rank.right) {
          opposingCard.color = card.color;
        }
      }
    }

    this.updateScore();
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
