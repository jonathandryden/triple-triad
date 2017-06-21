class Card {
  constructor(properties) {
    this.id = properties.id;
    this.name = properties.name;
    this.color = properties.color;
    this.element = properties.element;
    this.rank = properties.rank;
  }
}

module.exports = Card;
