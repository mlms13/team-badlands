
function ui (game, action) {
	if (action === 'blackandwhite') {
		game.game.world.filters = [game.grayFilter];
	} else if (action === 'color') {
		game.game.world.filters = null;
	}
}

function weather (game, action) {
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

}

module.exports = {
	ui        : ui,
	weather   : weather,
	character : character,
	powerup   : powerup
};