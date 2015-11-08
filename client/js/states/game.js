// require entities here
var Character = require('../entities/character');
var Block = require('../entities/block');

function Game() {}

var character;
var ground;
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
    this.physics.arcade.gravity.setTo(0, 900);

    // (re)set timers
    elapsed = 0;

    var world = this.add.sprite(0, 0, 'background');

    character = new Character(this.game, 40, this.game.height - 200);
    this.game.physics.arcade.enable(character);
    world.addChild(character);

    ground = new Block(this.game, 0, this.game.height - 64, this.game.width, 64);
    this.game.physics.arcade.enable(ground);
    ground.body.immovable = true;
    ground.body.allowGravity = false;
    world.addChild(ground);
    clock = this.add.bitmapText(32, 32, 'Audiowide', '', 20);
  },

  update: function () {
    // never allow more than 250ms to be added per frame
    // which happens when you blur, then re-focus the tab
    elapsed += Math.min(this.time.elapsed / 1000, 0.25);
    this._updateTime();

    // handle collisions
    this.game.physics.arcade.collide(character, ground);
  }
};

module.exports = Game;
