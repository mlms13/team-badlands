function Preloader() {}

Preloader.prototype = {
  preload: function () {
    // set up the preload bar
    this.preloadBar = this.add.sprite(this.world.centerX - 150, this.world.centerY - 4, 'preloader');
    this.load.setPreloadSprite(this.preloadBar);

    // start loading the rest of the assets
    this.load.image('background', 'assets/background.png');
    this.load.image('penguin', 'assets/penguin.png');
    this.load.image('trump', 'assets/trump.png');
    this.load.image('mario', 'assets/mario.png');
    this.load.image('luigi', 'assets/luigi.png');
    this.load.image('ice', 'assets/ice.png');
    this.load.bitmapFont('Audiowide Glow', 'assets/audiowide/glow.png', 'assets/audiowide/glow.fnt');
    this.load.bitmapFont('Audiowide', 'assets/audiowide/small.png', 'assets/audiowide/small.fnt');
  },
  create: function () {
    this.game.state.start('Main Menu');
  }
};

module.exports = Preloader;
