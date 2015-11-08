var Phaser = window.Phaser;

var game = new Phaser.Game(768, 576, Phaser.AUTO, 'game');

game.state.add('Boot', require('./states/boot'));
game.state.add('Preloader', require('./states/preloader'));
game.state.add('Main Menu', require('./states/mainmenu'));
game.state.add('Game', require('./states/game'));
game.state.start('Boot');
