
var Scoreboard = function(game) {

  Phaser.Group.call(this, game);

  this.scoreText = this.game.add.bitmapText(this.game.width / 2, 150, 'Audiowide', '');
  this.add(this.scoreText);

  this.y = this.game.height;
  this.x = 0;
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score) {
  this.scoreText.setText(score.toString());
};

module.exports = Scoreboard;