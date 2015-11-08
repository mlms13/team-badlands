var Phaser = window.Phaser;

var Block = function (game, x, y, w, h) {
  console.log("making a TileSprite with", x, y, w, h);
  Phaser.TileSprite.call(this, game, x, y, w, h, 'ice');
};

Block.prototype = Object.create(Phaser.TileSprite.prototype);
Block.prototype.constructor = Block;

module.exports = Block;
