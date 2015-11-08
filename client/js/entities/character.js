var Phaser = window.Phaser;

var Character = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'penguin');
  this.fuel = 100;
  this.fishCount = 0;
};

Character.prototype = Object.create(Phaser.Sprite.prototype);
Character.prototype.constructor = Character;

module.exports = Character;
