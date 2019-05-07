var GameOver = function(game) {};
GameOver.prototype = {
	init: function(Score){ 
		//pass in player score
       this.Score = Score;
   },
	create: function(){
		//styleized game over text
		var overText = game.add.text(game.world.centerX, 50, 'Game Over', { fontSize: '60px'});
		overText.anchor.setTo(0.5);
		var grd = overText.context.createLinearGradient(0, 0, 0, overText.canvas.height);
    	grd.addColorStop(0, '#dda556');   
    	grd.addColorStop(1, '#ff1919');
    	overText.fill = grd;

    	//display score
    	var scoreText = game.add.text(game.world.centerX, 150, 'Score: ' + Score, { fontSize: '40px', fill: '#FFFF' });
    	scoreText.anchor.setTo(0.5);

    	//play again
    	var playText = game.add.text(game.world.centerX, 350, 'Press SPACEBAR to Play Again!', { fontSize: '50px', fill: '#FFFF' });
    	playText.anchor.setTo(0.5);
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Play');
		}
	}
	
};