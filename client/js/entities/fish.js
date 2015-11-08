var Phaser = window.Phaser;

var Fish = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'fish');
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
};

Fish.prototype = Object.create(Phaser.Sprite.prototype);
Fish.prototype.constructor = Fish;

module.exports = Fish;
