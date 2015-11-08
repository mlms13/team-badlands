var Block = require('../entities/block');

function Wall(game, x, y) {
  Block.call(this, game, x, y, 64, game.height);

  this.game.physics.arcade.enableBody(this);
  this.anchor.setTo(0, 0.5);

  this.body.allowGravity = false;
  this.body.immovable = true;
}

Wall.prototype = Object.create(Block.prototype);
Wall.prototype.constructor = Wall;

module.exports = Wall;
