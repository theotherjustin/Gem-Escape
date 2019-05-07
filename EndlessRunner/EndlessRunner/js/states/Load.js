var Load = function(game) {};
Load.prototype = {
	preload: function(){
		//load all the assets
		game.load.atlas('key', 'assets/img/spritesheet.png', 'assets/img/sprites.json');
		game.load.image('Castle', 'assets/img/Castle.png');
		game.load.image('mainBack', 'assets/img/MainMenu.png');
		game.load.audio('run', 'assets/audio/mood.mp3');
		game.load.audio('main', 'assets/audio/meow.mp3');
        game.load.audio('jump', 'assets/audio/jump.mp3');
        game.load.audio('oof', 'assets/audio/oof.mp3');
        game.load.audio('lazor', 'assets/audio/lazor.mp3');
	},
	create: function(){
		//display loading..
        var sText = game.add.text(400, 200, 'Loading...', { fontSize: '32px', fill: '#FFFF' });
    },
    update: function(){
    	//move to mainmenu
        game.state.start('MainMenu');
    }
	
};