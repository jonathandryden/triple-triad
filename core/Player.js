class Player {
  constructor(properties) {
    if (properties) {
      this.name   = properties.name ? properties.name : (Math.round(Math.random()) ? "Alice" : "Bob");
      this.number =properties.number ? properties.number : -1;
      this.hand   =properties.hand ? [...properties.hand] : [];
    } else {
      this.name   =Math.round(Math.random()) ? "Alice" : "Bob";
      this.number = -1;
      this.hand   = [];
    }
  }
}

module.exports = Player;
