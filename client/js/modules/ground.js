var Block = require('../entities/block');

function Ground(game, x, y, w, h) {
  Block.call(this, game.game, x, y, w, h);

  this.game.physics.arcade.enable(this);

  this.body.allowGravity = false;
  this.body.immovable = true;

  this.autoScroll(game.groundSpeed, 0);
}

Ground.prototype = Object.create(Block.prototype);
Ground.prototype.constructor = Ground;

module.exports = Ground;
