var socket = require('../socket');
var sock;

// require entities here
var Character = require('../entities/character');
var Block = require('../entities/block');

// require modules here
var Ground = require('../modules/ground');
var WallGroup = require('../modules/WallGroup');

function Game() {
  this.characterSpeed = 200;
  this.groundSpeed = this.characterSpeed * - 0.7;
}

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
    sock = socket.init();
    this.setupListeners();
    this.actions = {};

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.setTo(0, 900);

    jumpUp = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    jetpackUp = this.input.keyboard.addKey(Phaser.Keyboard.UP);

    // (re)set timers
    elapsed = 0;

    var world = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
    world.autoScroll(this.characterSpeed * -0.3, 0);

    character = new Character(this.game, 40, this.game.height - 200);
    this.game.physics.arcade.enable(character);
    world.addChild(character);
    character.body.collideWorldBounds = true;

    clock = this.add.bitmapText(32, 32, 'Audiowide', '', 20);

    this.walls = this.game.add.group();

    // set up all the basic key handlers
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // Generate walls
    this.generateWalls();
    this.wallGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.generateWalls, this);
    this.wallGenerator.timer.start();

    ground = new Ground(this, 0, this.game.height - 64, this.game.width, 64);
    world.addChild(ground);

  },

  update: function () {
    // never allow more than 250ms to be added per frame
    // which happens when you blur, then re-focus the tab
    elapsed += Math.min(this.time.elapsed / 1000, 0.25);
    this._updateTime();

    // handle collisions
    this.game.physics.arcade.collide(character, ground);

    this.walls.forEach(function(wallGroup) {
      this.game.physics.arcade.collide(character, wallGroup);
    }, this);

    this.applyActions();

    // handle movement
    if (jumpUp.isDown && character.body.touching.down) {
      character.body.velocity.y = -300;
    }

    if (jetpackUp.isDown && character.fuel > 0) {
      character.body.velocity.y = -300;
    }

    if (this.cursors.left.isDown) {
      character.body.velocity.x = this.characterSpeed * - 1;
    } else if (this.cursors.right.isDown) {
      character.body.velocity.x = this.characterSpeed;
    } else {
      character.body.velocity.x = 0;
    }

    if (character.body.touching.down) {
      character.body.velocity.x += this.groundSpeed;
    }
  },

  setupListeners: function () {
    sock.on('tweet', function (data) {
      var type   = data.type;
      var action = data.action;

      this.actions[type] = action;
      console.log(this.actions);
    }.bind(this));
  },

  applyActions: function () {

  },

  generateWalls: function() {
    var wallY = this.game.rnd.integerInRange(0, this.game.height);
    var wallGroup = this.walls.getFirstExists(false);

    if (!wallGroup) {
      wallGroup = new WallGroup(this, this.walls);
    }

    wallGroup.reset(this.game.width, wallY);
  }
};

module.exports = Game;
