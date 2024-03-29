var actions = require('../modules/actions');
var socket = require('../socket');
var sock;

// require entities here
var Character = require('../entities/character');
var Block = require('../entities/block');

// require modules here
var Ground = require('../modules/ground');
var WallGroup = require('../modules/wallGroup');
var FishGroup = require('../modules/fishGroup');
var Scoreboard = require('../modules/scoreboard');

function Game() {
  this.characterSpeed = 200;
  this.groundSpeed = this.characterSpeed * - 2.5;
}

// sprites and groups
var ground;

// keyboard helpers
var jumpUp;
var jetpackUp;

// score stuff
var elapsed;
var score;

Game.prototype = {

  _updateScore: function () {
    score.text = Math.floor(elapsed * 40) + this.character.fishCount * 100;
  },

  create: function () {
    sock = socket.init();
    this.setupListeners();
    this.actions = {};

    this.grayFilter = this.add.filter('Gray');
    this.grayFilter.gray = 1;

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.setTo(0, 900);

    jumpUp = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    jetpackUp = this.input.keyboard.addKey(Phaser.Keyboard.UP);

    // (re)set timers
    elapsed = 0;

    var world = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
    world.autoScroll(this.characterSpeed * -0.3, 0);

    this.character = new Character(this.game, 40, this.game.height - 200);
    this.game.physics.arcade.enable(this.character);
    world.addChild(this.character);
    this.character.body.collideWorldBounds = true;

    score = this.add.bitmapText(32, 32, 'Audiowide', '', 20);

    this.walls = this.game.add.group();
    this.fish = this.game.add.group();

    // set up all the basic key handlers
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // Generate walls
    // this.generateWalls();
    this.wallGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateWalls, this);
    this.wallGenerator.timer.start();

    // Generate fish
    this.generateFish();

    ground = new Ground(this, 0, this.game.height - 64, this.game.width, 64);
    world.addChild(ground);

    this.dead = false;
  },

  update: function () {

    if (this.dead) {
      this.walls.callAll('stop');
      this.wallGenerator.timer.stop();
      ground.stopScroll();
      this.scoreboard = new Scoreboard(this.game);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(score.text);
      this.character.kill();

      return;
    }

    // never allow more than 250ms to be added per frame
    // which happens when you blur, then re-focus the tab
    elapsed += Math.min(this.time.elapsed / 1000, 0.25);
    this._updateScore();

    // Generate walls more and more often as time passes
    // if (Math.floor(elapsed) % 2 === 0) {
      // this.generateWalls();
    // }

    // handle collisions
    this.game.physics.arcade.collide(this.character, ground);

    this.walls.forEach(function(wallGroup) {
      this.game.physics.arcade.collide(this.character, wallGroup, this.wallHandler, null, this);
    }, this);

    this.fish.forEachExists(function(fish) {
      this.game.physics.arcade.overlap(this.character, fish, this.catchFish);
    }, this);

    this.applyActions();

    // handle movement
    if (jumpUp.isDown && this.character.body.touching.down) {
      this.character.body.velocity.y = -300;
    }

    if (jetpackUp.isDown && this.character.fuel > 0) {
      this.character.body.velocity.y = -300;
    }

    if (this.cursors.left.isDown) {
      this.character.body.velocity.x = this.characterSpeed * - 1;
    } else if (this.cursors.right.isDown) {
      this.character.body.velocity.x = this.characterSpeed;
    } else {
      this.character.body.velocity.x = 0;
    }

    if (this.character.body.touching.down) {
      this.character.body.velocity.x += this.groundSpeed;
    }
  },

  wallHandler: function (character, wallGroup) {
    if (character.position.x < 0) {
      this.dead = true;
    }
  },

  catchFish: function (char, fish) {
    char.fishCount++;
    fish.destroy();
  },

  setupListeners: function () {
    sock.on('tweet', function (data) {
      var type   = data.type;
      var action = data.action;

      this.actions[type] = action;
    }.bind(this));
  },

  applyActions: function () {
    for (var type in this.actions) {
      actions[type](this, this.actions[type]);
    }
  },

  generateWalls: function() {
    var wallY = Math.floor(Math.random() * ((this.game.height - 128) / 64) + 3) * -64;
    var wallGroup = this.walls.getFirstExists(false);

    if (!wallGroup) {
      wallGroup = new WallGroup(this, this.walls);
    }

    wallGroup.reset(this.game.width, wallY);
  },

  generateFish: function() {
    var fishGroup = this.fish.getFirstExists(false);
    if (!fishGroup) {
      fishGroup = new FishGroup(this, this.fish);
    }

    fishGroup.addFish();
  }
};

module.exports = Game;
