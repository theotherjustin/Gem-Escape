"use strict";

// define globals
var game;
var Score;
/*
For something technically interesting, I added the sprite transformation and laser color matching aspect.
The sprite transforming is something I plan on adding to the group project for this class so I wanted to explore it early.
The color matching was the core mechanic I wanted to add when i first thought of ideas for making this game

For visual style, I decided on the idea of being a collectable escaping adventurers trying to collect you
Originally, the game also had knight obstacles to avoid to add to the theme, but i removed them because they made the game too difficult
The death sound is a collection sound, signaling you were collected rather than dying
I also made my own background music for the mainmenu and the play state
I'm not much of an artist but I explored making pixel art and made the lasers and the "QWE" instruction sign
I also learned more about stylizing text with the title text and game over text

The rest of the audio and image assets were purchased as a part of the Humble 8-Bit Pixel Game Dev Bundle
*/
// wait for browser to load 
window.onload = function() {  
    // define game
    game = new Phaser.Game(960,540, Phaser.AUTO, '');
    
    // define states
    game.state.add('Load', Load);
    game.state.add('MainMenu', MainMenu);
    game.state.add('Play', Play);
    game.state.add('GameOver', GameOver);
    game.state.start('Load');
}