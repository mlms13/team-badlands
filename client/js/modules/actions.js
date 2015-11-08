var gameEl = document.getElementById('game');
var text;

function ui (game, action) {
    if (action === 'blackandwhite') {
        game.game.world.filters = [game.grayFilter];
    } else if (action === 'color') {
        game.game.world.filters = null;
    }

    if (action === 'faded') {
        game.character.alpha = 0.35;
    } else if (action === 'sober') {
        game.character.alpha = 1;
    }

    if (action === 'shake') {
        gameEl.classList.add('shake');
        text = game.add.bitmapText(game.world.centerX - 50, 32, 'Audiowide', 'SHAKE IT', 20);
        setTimeout(function () {
            game.world.remove(text);
        }, 2500);

        setTimeout(function () {
            gameEl.classList.remove('shake');
        }, 350);

        delete game.actions.ui;
    }
}

function weather (game, action) {
    if (action === 'rain') {
    }
}

function character (game, action) {
    if (action === 'trump') {
        game.character.loadTexture('trump');
    } else if (action === 'mario') {
        game.character.loadTexture('mario');
    } else if (action === 'luigi') {
        game.character.loadTexture('luigi');
    }
}

function powerup (game, action) {
    if (action === 'turbo') {
        text = game.add.bitmapText(game.world.centerX - 100, 32, 'Audiowide', 'TURBO SPEED UP!', 20);
        setTimeout(function () {
            game.world.remove(text);
        }, 2500);
        game.characterSpeed += 100;
        setTimeout(function () {
            powerupReset(game);
        }, 5000);
        delete game.actions.powerup;
    }
    if (action === 'fart') {
        text = game.add.bitmapText(game.world.centerX - 100, 32, 'Audiowide', 'FART SPEED UP!', 20);
        setTimeout(function () {
            game.world.remove(text);
        }, 2500);
        game.characterSpeed += 250;
        setTimeout(function () {
            powerupReset(game);
        }, 100);
        delete game.actions.powerup;
    }
    if (action === 'netflixandchill') {
        text = game.add.bitmapText(game.world.centerX - 250, 32, 'Audiowide', 'NETFLIX AND CHILL: SPEED DOWN!', 20);
        setTimeout(function () {
            game.world.remove(text);
        }, 2500);
        game.characterSpeed -= 100;
        setTimeout(function () {
            powerupReset(game);
        }, 5000);
        delete game.actions.powerup;
    }
}

function powerupReset (game) {
    game.characterSpeed = 200;
}

module.exports = {
    ui        : ui,
    weather   : weather,
    character : character,
    powerup   : powerup
};