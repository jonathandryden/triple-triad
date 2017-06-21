const Player = require("./Player.js"),
      Card   = require("./Card.js"),
      CardDb = require("./cards.json"),
      Errors = require("./Errors");

// utilities
const hasEmptyCells = function hasEmptyCells(board) {
  for (let i = 0, len = board.length; i < len; i++) {
    for (let j = 0, len2 = board[i].length; j < len2; j++) {
      if (!board[i][j]) return true;
    }
  }
  return false;
};

const compareCards = function compareCards(card, dir, opposingCard, def) {
  if (opposingCard) {
    if (opposingCard.color !== card.color && card.rank[dir] > opposingCard.rank[def]) {
      opposingCard.color = card.color;
    }
  }
};

class Game {
  constructor(importedGame) {
    if (importedGame) {
      this.name       = importedGame.name;
      this.status     = importedGame.status;
      this.playerTurn = importedGame.playerTurn;
      this.board      = [...importedGame.board];
      this.players    = [...importedGame.players];
      this.score      = [...importedGame.score];
    } else {
      this.name       = "Triple Triad";
      this.status     = "Pre-Game";
      this.playerTurn = 1;
      this.board      = [
                          [undefined, undefined, undefined],
                          [undefined, undefined, undefined],
                          [undefined, undefined, undefined]
                        ];
      this.players    = [new Player({number: 1}), new Player({number: 2})];
      this.score      = [0, 0];
      
      this.dealCards(5);
    }
  }

  dealCards(numberOfCards) {
    let tempDeck = [],
        randomCardId,
        card;

    for (let playerIndex = 0; playerIndex < 2; playerIndex++) {
      for (let cardCounter = 0; cardCounter < numberOfCards; cardCounter++) {
        randomCardId = Math.floor((Math.random() * CardDb.length));
        card = CardDb[randomCardId];
        if (playerIndex === 1) card.color = "BLUE";
        tempDeck.push(card);
      }
      this.players[playerIndex].hand = [...tempDeck];
      tempDeck = [];
    }
  }

  playMove(playerNumber, cardId, xLocation, yLocation) {
    let x           = xLocation,
        y           = yLocation,
        playerIndex = playerNumber - 1,
        cardIndex   = this.players[playerIndex].hand.findIndex(item => item.id === cardId),
        card        = this.players[playerIndex].hand[cardIndex],
        opposingCard;

    if (this.playerTurn !== playerNumber || this.board[y][x] || !card) {
      // err
      console.error("playMove error \r\nthis.playerTurn !== playerNumber || this.board[y][x] || !card\r\n" + this.playerTurn !== playerNumber + " " + this.board[y][x] + " " + !card);
    }

    this.board[y][x] = card;
    this.players[playerIndex].hand.splice(cardIndex, 1);

    // compare top, right, bottom and left cards
    if (y - 1 >= 0) {
      compareCards(card, "top", this.board[y - 1][x], "bottom");
    }
    if (x + 1 <= 2) {
      compareCards(card, "right", this.board[y][x + 1], "left");
    }
    if (y + 1 <= 2) {
      compareCards(card, "bottom", this.board[y + 1][x], "top");
    }
    if (x - 1 >= 0) {
      compareCards(card, "left", this.board[y][x - 1], "right");
    }

    this.updateScore();
  }

  updateScore() {
    this.score = [0, 0];

    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col]) {
          if (this.board[row][col].color === "RED") {
            this.score[0]++;
          } else {
            this.score[1]++;
          }
        }
      }
    }

    if (!hasEmptyCells(this.board)) this.status = "Game Over";
  }
}

module.exports = Game;
