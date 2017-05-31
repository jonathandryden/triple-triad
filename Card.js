class Card {
  constructor(properties) {
    this.id = properties.id;
    this.color = properties.color;
    this.attr = properties.attr;
    this.rank = properties.rank;
    this.img = properties.img;
  }
}

module.exports = Card;
