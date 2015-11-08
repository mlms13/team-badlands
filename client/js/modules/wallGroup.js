var Wall = require('./wall');

var groundSpeed;

function WallGroup(game, parent) {
  groundSpeed = game.groundSpeed;

  Phaser.Group.call(this, game.game, parent);

  this.topWall = new Wall(this.game, 0, 0);
  this.bottomWall = new Wall(this.game, 0, 128);
  this.add(this.topWall);
  this.add(this.bottomWall);
  this.hasScored = false;

  this.setAll('body.velocity.x', groundSpeed);
}

WallGroup.prototype = Object.create(Phaser.Group.prototype);
WallGroup.prototype.constructor = WallGroup;

WallGroup.prototype.update = function() {
  this.checkWorldBounds();
};

WallGroup.prototype.checkWorldBounds = function() {
  if (!this.topWall.inWorld) {
    this.exists = false;
  }
};

WallGroup.prototype.reset = function(x, y) {
  this.topWall.reset(0, 0);
  this.bottomWall.reset(0, 128);
  this.x = x;
  this.y = y;
  this.setAll('body.velocity.x', groundSpeed);
  this.hasScored = false;
  this.exists = true;
};

module.exports = WallGroup;
