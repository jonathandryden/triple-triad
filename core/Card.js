class Card {
  constructor(properties) {
    this.cId      = properties.cId;
    this.name    = properties.name;
    this.color   = properties.color;
    this.element = properties.element;
    this.rank    = properties.rank;
  }
}

module.exports = Card;
