var Fish = require('../entities/fish');

var groundSpeed;

function FishGroup(game, parent) {
  groundSpeed = game.groundSpeed;

  Phaser.Group.call(this, game.game, parent);
  this.fishes = [];
}

FishGroup.prototype = Object.create(Phaser.Group.prototype);
FishGroup.prototype.constructor = FishGroup;

FishGroup.prototype.addFish = function() {
  for (var i = 0; i < 5; i++) {
    var newFish = new Fish(this.game, 128 + (i * 96), this.game.world.height - 128);
    this.fishes.push(newFish);
    this.add(newFish);
  }

  this.setAll('body.velocity.x', groundSpeed);
};

FishGroup.prototype.update = function() {
  this.fishes.forEach(function (fish) {
    if (!fish.inWorld) {
      fish.exists = false;
    }
  });
};

FishGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
};

module.exports = FishGroup;
