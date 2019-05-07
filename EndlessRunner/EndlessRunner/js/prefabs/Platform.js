var Platform = function(game, scale, x, y){ //platform prefab\
	//override phaser.sprite
	Phaser.Sprite.call(this, game, game.width + 200, y, 'key','Platform');
	game.physics.enable(this,Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.x = x;
	this.y = y;
	this.scale.x = scale;
	this.body.immovable = true;
	this.body.checkCollision.down = false;
	this.body.velocity.x = -250;
};
//tell phaser which constructor to use
Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.update = function() {
	// kill the paddle if it reaches the left edge of the screen
	if(this.x < -this.width) {
		this.kill();	
	}
}