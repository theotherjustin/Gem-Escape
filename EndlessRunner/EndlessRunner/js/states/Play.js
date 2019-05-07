var Play = function(game){
	//define variables
	var castle;
	var player;
	var gemType;
	var speed;
	var jumps;
	var redLazer;
};
Play.prototype = {
	create:function(){
		//castle tilesprite
		castle = game.add.tileSprite(0,0,game.width, game.height, 'Castle');

		//reset score to 0 and display it in the corner
		Score = 0;
		scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFFF' });
		//display sign to remid player of the controls
		sign = game.add.sprite(0,450, 'key', 'sign');

		//spawn player sprite
		player = game.add.sprite(200,300, 'key', 'GreenGem1');
		player.anchor.set(0.5);
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.gravity.y = 1500;
		player.immovable=true;
		//add different animations
		player.animations.add("GreenSpin",['GreenGem1','GreenGem2','GreenGem3','Greengem4'], 10, true);
		player.animations.add("RedSpin",['RedGem1','RedGem2','RedGem3','Redgem4'], 10, true);
		player.animations.add("BlueSpin",['BlueGem1','BlueGem2','BlueGem3','Bluegem4', 'BlueGem5', 'BlueGem6', 'BlueGem7', 'BlueGem8'], 10, true);
		//start as green gem
		player.animations.play('GreenSpin');
		//double jump
		jumps = 2;
		//maintain gem type for laser collision
		gemType = 1;
		//base speed
		speed = -250;

		//platforms
		this.platformGroup = game.add.group();
		//spawn platform
		var plat = new Platform(game, 3, 620, 400);
		game.add.existing(plat);
		this.platformGroup.add(plat);
		//add first platform early to make it easier to jump onto
		var plat = new Platform(game, (Math.random() + 0.2),game.width + 200, (Math.random() * 100) + 300);
		game.add.existing(plat);
		this.platformGroup.add(plat);

		//setup laser groups
		this.laserGroupG = game.add.group();
		this.laserGroupR = game.add.group();
		this.laserGroupB = game.add.group();

		//start timer
		this.Timer = game.time.create(false);	
		this.Timer.loop(1000, this.speedup, this); 
		this.Timer.start();	

		//add audio and begin looping background music
		this.run = game.add.audio('run');
    	this.run.play('', 0, 1, true);
		this.oofers = game.add.audio('oof');
		this.jump = game.add.audio('jump');
		this.lazor = game.add.audio('lazor');
	},
	speedup:function(){
		//add to speed and increment score every second
		speed -=10;
		Score +=10;
		scoreText.text = 'Score: ' + Score;

		//random chance to spwan a laser ever second
		var laserRNG = Math.random();
		if(laserRNG > 0.75){
			colorRNG = Math.random();
			//different RNG for different colors
			if(colorRNG < 0.3){ //Green
				this.lazor.play('', 0, 0.3, false);
				greenLazer = game.add.sprite(game.width + 210, 0, 'key', 'GreenLazer');
				game.physics.enable(greenLazer, Phaser.Physics.ARCADE);
				greenLazer.body.velocity.x = -300 + speed/2;
				this.laserGroupG.add(greenLazer);
			}
			else if (0.4 < colorRNG < 0.7){ //Red
				this.lazor.play('', 0, 0.3, false);
				redLazer = game.add.sprite(game.width + 210, 0, 'key', 'RedLazer');
				game.physics.enable(redLazer, Phaser.Physics.ARCADE);
				redLazer.body.velocity.x = -300 + speed/2;
				this.laserGroupR.add(redLazer);
			}else if (colorRNG > 0.7){ //Blue
				this.lazor.play('', 0, 0.3, false);
				blueLazer = game.add.sprite(game.width + 210, 0, 'key', 'BlueLazer');
				game.physics.enable(blueLazer, Phaser.Physics.ARCADE);
				blueLazer.body.velocity.x = -300 + speed/2;
				this.laserGroupB.add(blueLazer);
			}
		}

		//spawn platforms every second 
		var plat = new Platform(game, (Math.random() + 0.2),game.width + 250, (Math.random() * 100) + 300);
		game.add.existing(plat);
		this.platformGroup.add(plat);

		if(speed < -500){ //spawn extra platforms at a certain speed to make it easier
		var plat = new Platform(game, (Math.random() + 0.2),game.width - speed, (Math.random() * 100) + 300);
		game.add.existing(plat);
		this.platformGroup.add(plat);
		}
		//make sure all the platforms are moving at the same speed
		this.platformGroup.forEachAlive(function(platform) {
			platform.body.velocity.x = speed;
    });
	},
	update:function(){
		castle.tilePosition.x -=2; //scroll background
		player.x = 200; //keep the gem from sliding with the platforms

		//collide with the platforms
		//Note: platforms are setup so that you can jump through the bottom in prefab
		game.physics.arcade.collide(player, this.platformGroup);
		if(player.body.touching.down){
			//refresh double jump
			jumps = 2;
		}
		//check for input and #of jumps or if player is on a platform
		if(this.input.keyboard.justPressed(Phaser.Keyboard.UP) && (jumps > 0 || player.body.touching.down)){
			//play jump sound
			this.jump.play('', 0, 0.4, false);
			player.body.velocity.y = -600;
			//decrease jump counter
			jumps--;
		}

		if(player.y > 550){ //player falls down
			//play collecting sound and stop BG music
			this.oofers.play('', 0, 1, false);
			this.run.stop();
			game.state.start('GameOver', this.Score);
		}

		//transform into different color gems with QWE
		if(this.input.keyboard.justPressed(Phaser.Keyboard.Q) && gemType != 1){
			player.animations.play('GreenSpin');
			gemType = 1;
		}

		if(this.input.keyboard.justPressed(Phaser.Keyboard.W) && gemType != 2){
			player.animations.play('RedSpin');
			gemType = 2;
		}

		if(this.input.keyboard.justPressed(Phaser.Keyboard.E) && gemType != 3){
			player.animations.play('BlueSpin');
			gemType = 3;
		}

		//check overlap with different laser colors
		game.physics.arcade.overlap(player, this.laserGroupG, this.greenColl, null, this);
		game.physics.arcade.overlap(player, this.laserGroupR, this.redColl, null, this);
		game.physics.arcade.overlap(player, this.laserGroupB, this.blueColl, null, this);
		//despawn laser after passing screen edge for each color group
		this.laserGroupG.forEachAlive(function(lazer) {
			if(lazer.x < -200){
				lazer.kill();
			}
    });
		this.laserGroupR.forEachAlive(function(lazer) {
			if(lazer.x < -200){
				lazer.kill();
			}
    });
		this.laserGroupB.forEachAlive(function(lazer) {
			if(lazer.x < -200){
				lazer.kill();
			}
    });
	},
	//collision check for each color laser
	greenColl:function(){
		if(gemType !=1){
			this.oofers.play('', 0, 1, false);
			this.run.stop();
			game.state.start('GameOver', this.Score);	
		}
	},
	redColl:function(){
		if(gemType !=2){
			this.oofers.play('', 0, 1, false);
			this.run.stop();
			game.state.start('GameOver', this.Score);	
		}
	},
	blueColl:function(){
		if(gemType !=3){
			this.oofers.play('', 0, 1, false);
			this.run.stop();
			game.state.start('GameOver', this.Score);	
		}
	}
};