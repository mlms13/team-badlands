// require entities here
var Character = require('../entities/character');

function Game() {}

var character;
var elapsed;
var clock;

Game.prototype = {

  _updateTime: function () {
    var min = Math.floor(elapsed / 60),
        sec = elapsed - (min * 60),
        str = min + " min " + sec.toFixed(1) + " sec";

    clock.text = str;
  },

  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // (re)set timers
    elapsed = 0;

    var world = this.add.sprite(0, 0, 'background');
    world.width = this.game.width;
    world.height = this.game.height;
    console.log(this.game.height);
    character = new Character(this.game, 40, world.height);
    world.addChild(character);

    clock = this.add.bitmapText(32, 32, 'Audiowide', '', 20);
  },

  update: function () {
    // never allow more than 250ms to be added per frame
    // which happens when you blur, then re-focus the tab
    elapsed += Math.min(this.time.elapsed / 1000, 0.25);
    this._updateTime();

    // TODO: handle collisions and gravity
  }
};

module.exports = Game;
