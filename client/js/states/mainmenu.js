function MainMenu() {}

MainMenu.prototype = {
  create: function () {
    var mainTitle, startBtn, buttonBg;

    // create the big title
    mainTitle = this.add.bitmapText(this.world.centerX, 100, 'Audiowide Glow', 'Polar Badlands', 64);
    mainTitle.align = 'center';
    mainTitle.updateText();
    mainTitle.x = this.world.centerX - (mainTitle.textWidth / 2);

    // create the "start game" button
    startBtn = this.add.bitmapText(this.world.centerX, 400, 'Audiowide', 'Start Game', 20);
    startBtn.updateText();
    startBtn.x = this.world.centerX - (startBtn.textWidth / 2);
    startBtn.hitArea = new Phaser.Rectangle(-20, -10, startBtn.width + 40, startBtn.height + 20);
    startBtn.inputEnabled = true;
    startBtn.buttonMode = true;

    // add a background for our play again button
    buttonBg = this.add.graphics();
    buttonBg.alpha = 0;
    buttonBg.beginFill(0x999999, 0.1);
    buttonBg.drawRect(startBtn.x - 20, startBtn.y - 10, startBtn.width + 40, startBtn.height + 20);
    buttonBg.endFill();

    startBtn.events.onInputOver.add(function () {
      this.add.tween(buttonBg).to({ alpha: 1 }, 150).start();
    }, this);

    startBtn.events.onInputOut.add(function () {
      this.add.tween(buttonBg).to({ alpha: 0 }, 150).start();
    }, this);

    startBtn.events.onInputDown.add(function () {
      this.state.start('Game');
    }, this);
  },

  update: function () {
    if (this.input.keyboard.isDown(32) || this.input.keyboard.isDown(13)) {
      this.state.start('Game');
    }
  }
};

module.exports = MainMenu;
