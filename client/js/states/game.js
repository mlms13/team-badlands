// require entities here
var Character = require('../entities/character');
var Block = require('../entities/block');

function Game() {}

// sprites and groups
var character;
var ground;

// keyboard helpers
var jumpUp;
var jetpackUp;

// clock stuff
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

    jumpUp = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    jetpackUp = this.input.keyboard.addKey(Phaser.Keyboard.UP);

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

    // set up all the basic key handlers
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },

  update: function () {
    // never allow more than 250ms to be added per frame
    // which happens when you blur, then re-focus the tab
    elapsed += Math.min(this.time.elapsed / 1000, 0.25);
    this._updateTime();

    // handle collisions
    this.game.physics.arcade.collide(character, ground);

    // handle movement
    if (jumpUp.isDown && character.body.touching.down) {
      character.body.velocity.y = -300;
    }

    if (jetpackUp.isDown && character.fuel > 0) {
      character.body.velocity.y = -300;
    }

    if (this.cursors.left.isDown) {
      character.body.velocity.x = -200;
    } else if (this.cursors.right.isDown) {
      character.body.velocity.x = 200;
    } else {
      character.body.velocity.x = 0;
    }

  }
};

module.exports = Game;
