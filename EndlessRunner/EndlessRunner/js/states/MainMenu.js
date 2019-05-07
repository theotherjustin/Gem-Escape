var MainMenu = function(game) {
	var playText;
};
MainMenu.prototype = {
	create: function(){
		game.add.sprite(0, 0, 'mainBack'); //menu background

		//stylized title text
		var titleText = game.add.text(game.world.centerX, 50, 'Gem Escape!', { fontSize: '80px'});
		titleText.anchor.setTo(0.5);
		var grd = titleText.context.createLinearGradient(0, 0, 0, titleText.canvas.height);
    	grd.addColorStop(0, '#000000');   
    	grd.addColorStop(1, '#ff35f8');
    	titleText.fill = grd;

    	//basic instuctions
    	var insText = game.add.text(game.world.centerX, 180, 'Escape being collected by the greedy knights by using \n        the UP arrow key to jump and double jump!', { fontSize: '22px', fill: '#ffffff' });
    	//add stroke to make text more readable
    	insText.stroke = '#000000';
    	insText.strokeThickness = 6;
    	insText.anchor.setTo(0.5);

    	//explaining color matching aspect of the game
    	var lazerText = game.add.text(game.world.centerX, 370, 'Dodge mage spells by matching the laser color!', { fontSize: '22px', fill: '#FFFF' });
    	//add stroke to make text more readable
    	lazerText.stroke = '#000000';
    	lazerText.strokeThickness = 6;
    	lazerText.anchor.setTo(0.5);

    	//sign showing QWE controls
    	sign = game.add.sprite(game.world.centerX,270, 'key', 'sign');
    	sign.anchor.setTo(0.5);

    	//play text
    	playText = game.add.text(game.world.centerX, 480, 'Press SPACEBAR to Start!', { fontSize: '40px', fill: '#FFFF' });
    	playText.anchor.setTo(0.5);

    	this.main = game.add.audio('main');
    	this.main.play('', 0, 1, true);

    	//timer used to make play text flash
    	this.timer = game.time.create(false);	
		this.timer.loop(500, this.blink, this); 
		this.timer.start();
	},
	blink: function(){ //flashing
		playText.visible = !playText.visible;
	},
	update: function(){    
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.main.stop();
			this.timer.stop();
			game.state.start('Play');
		}
	}
	
};
