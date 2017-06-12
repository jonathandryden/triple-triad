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
    console.dir(this);
    console.log("location");
    console.dir(location);
    console.log("card");
    console.dir(card);
    console.log("board place");
    console.log(this.board[location.y][location.x]);
    if (this.board[location.y][location.x] != undefined) {
      return 1;
    }

    this.board[location.y][location.x] = card;
    console.log("SET");
    console.log(this.board[location.y][location.x]);
    
    var opposingCard = undefined;
    // check top
    if (location.y - 1 >= 0) {
      opposingCard = this.board[location.y - 1][location.x];
      console.log("op y-1");
      console.log(opposingCard);
      if (opposingCard != undefined && opposingCard.color != card.color) {
        if (card.rank.top > opposingCard.rank.bottom) {
          opposingCard.color = card.color;
        }
      }
    }

    // check right
    if (location.x + 1 <= 2) {
      opposingCard = this.board[location.y][location.x + 1];
      console.log("op x+1");
      console.log(opposingCard);
      if (opposingCard != undefined && opposingCard.color != card.color) {
        if (card.rank.right > opposingCard.rank.left) {
          opposingCard.color = card.color;
        }
      }
    }

    // check bottom
    if (location.y + 1 <= 2) {
      opposingCard = this.board[location.y + 1][location.x];
      console.log("op y+1");
      console.log(opposingCard);
      if (opposingCard != undefined && opposingCard.color != card.color) {
        if (card.rank.bottom > opposingCard.rank.top) {
          opposingCard.color = card.color;
        }
      }
    }

    // check left
    if (location.x - 1 >= 0) {
      opposingCard = this.board[location.y][location.x - 1];
      console.log("op x-1");
      console.log(opposingCard);
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
