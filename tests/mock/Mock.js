const Guid = require("guid"),
    CardDb = require("./cards.json");

const dealCards = function dealCards(color, numberOfCards, strength) {
    let tempDeck = [],
        randomCardId,
        card;

    for (let cardCounter = 0; cardCounter < numberOfCards; cardCounter++) {
        randomCardId = Math.floor((Math.random() * CardDb.length));
        card = CardDb[randomCardId];

        if (strength === "WEAK") {
            card = CardDb[CardDb.findIndex(item => item.cId === 11)];
        } else if (strength === "STRONG") {
            card = CardDb[CardDb.findIndex(item => item.cId === 10)];
        }

        card.color = color;

        card.id = Guid.create().value;
        tempDeck.push(card);
    }
    return tempDeck;
};

class Mock {
    static player(color, number, numberOfCards) {
        return {
            name: (Math.round(Math.random()) ? "Alice" : "Bob"),
            number: number,
            hand: dealCards(color, numberOfCards)
        };
    }

    static weakPlayer(color, number, numberOfCards) {
        return {
            name: "WEAK " + (Math.round(Math.random()) ? "Alice" : "Bob"),
            number: number,
            hand: dealCards(color, numberOfCards, "WEAK")
        };
    }

    static strongPlayer(color, number, numberOfCards) {
        return {
            name: "STRONG " + (Math.round(Math.random()) ? "Alice" : "Bob"),
            number: number,
            hand: dealCards(color, numberOfCards, "STRONG")
        };
    }

    static losingBoard() {
        let card = CardDb[CardDb.findIndex(item => item.cId === 11)];
        card.color = "BLUE";
        return [
            [undefined, card, undefined],
            [card, undefined, card],
            [undefined, card, undefined]
        ]
    }

    static fullBoard() {
        let card = CardDb[CardDb.findIndex(item => item.cId === 11)];
        card.color = "BLUE";
        return [
            [card, card, card],
            [card, card, card],
            [card, card, undefined]
        ]
    }
}

module.exports = Mock;