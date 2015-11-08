var gameEl = document.getElementById('game');

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
        game.characterSpeed += 100;
        setTimeout(function () {
            powerupReset(game);
        }, 5000);
        delete game.actions.powerup;
    }
    if (action === 'fart') {
        game.characterSpeed += 250;
        setTimeout(function () {
            powerupReset(game);
        }, 100);
        delete game.actions.powerup;
    }
    if (action === 'netflixandchill') {
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