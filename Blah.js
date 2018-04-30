//Creates instance of game object and changes canvas size
var game = new Phaser.Game(900, 490, Phaser.CANVAS);

//Declaring variables.
var MainMenu = function(game) {};
var energyText;
var helpText;
var gameOva;
var homiesText;
var homies = 0;
var player;
var titletext;
var jumpText;
var front;
var back;
var farback;
var platforms;
var startImage;
var endImage;
var doggie;
var mainMenuTheme;
var rUN;
var blues;
var bark;
var runText;

//Decalares Mainmenu prototype
MainMenu.prototype = {
	//loads the mainmenu images
	preload: function(){
		console.log('MainMenu: preload');
		//Credits: cyberpunk from: https://opengameart.org/content/cyberpunk-street-environment
		game.load.image('cyberpunk', 'assets/img/cyberpunk.png');
		//Credits: ALL dogs from: https://community.playstarbound.com/threads/fluffy-dogs-
		//other-alternative-dog-sprites-update-8-pug-time.109948/
		game.load.image('GreyStart', 'assets/img/GreyStart.png');
		game.load.image('BlackStart', 'assets/img/BlackStart.png');
		game.load.image('ShibaStart', 'assets/img/ShibaStart.png');
		game.load.image('BlondeStart', 'assets/img/BlondeStart.png');
		game.load.image('WhiteStart', 'assets/img/WhiteStart.png');
		game.load.image('ChocolateStart', 'assets/img/ChocolateStart.png');
		//Credits:Main Menu Theme From: https://opengameart.org/content/time-to-business-guys
		game.load.audio('MainMenuTheme', 'assets/audio/main.mp3');

	},
	//creates all of the assets
	create: function(){
		console.log("MainMenu: create'")
		//plays main menu theme
		mainMenuTheme = game.add.audio('MainMenuTheme');
		mainMenuTheme.play('', 0, 0.25, true);
		// adds in background
	    game.add.sprite(0, 0, 'cyberpunk');
	    //adds in static main menu dogs
	    startImage=game.add.sprite(150, 200, 'GreyStart');
	    startImage.scale.setTo(3,3);
	    startImage=game.add.sprite(250, 200, 'BlackStart');
	    startImage.scale.setTo(3,3);
	    startImage=game.add.sprite(350, 200, 'ShibaStart');
	    startImage.scale.setTo(3,3);
	    startImage=game.add.sprite(450, 200, 'BlondeStart');
	    startImage.scale.setTo(3,3);
	    startImage=game.add.sprite(650, 200,'WhiteStart');
	    startImage.scale.setTo(3,3);
	    startImage=game.add.sprite(550, 200, 'ChocolateStart');
	    startImage.scale.setTo(3,3);

		//creates text
		helpText = game.add.text(330, 110, 'Click spacebar to begin!', { fontSize: '16px', fill: '#EEE8AA' });
		titleText = game.add.text(120, 2, 'Run Doggy Run!', { fontSize: '80px', fill: '#EEE8AA' });
	},
	update: function() {
		//if spacebar is pressed, go to gameplay
		//Stops main menu theme from playing
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('GamePlay')
			mainMenuTheme.stop();
		}
	
	}
}

//Defines actual gameplay
var GamePlay = function(game){};
//loads gameplay assets
GamePlay.prototype = {
	preload: function(){
		console.log('GamePlay: preload');
		game.load.atlas('white', 'assets/img/white.png', 'assets/img/white.json');
		game.load.image('farback', 'assets/img/farback.png');
		game.load.image('back', 'assets/img/back.png');
		game.load.image('front', 'assets/img/front.png');
		game.load.image('gray', 'assets/img/gray.png');
		game.load.image('black', 'assets/img/black.png');
		game.load.image('shiba', 'assets/img/shiba.png');
		game.load.image('blonde', 'assets/img/blonde.png');
		game.load.image('chocolate', 'assets/img/chocolate.png');
		game.load.image('ground', 'assets/img/InvisiblePlatform.png');
		//Credits: Van from: https://opengameart.org/content/2d-car-sprite-11
		game.load.image('spca', 'assets/img/spca.png');
		//Credits:White car from:https://opengameart.org/content/2d-car-sprite-5
		game.load.image('car', 'assets/img/car.png');
		//Credits: Blue Car from: https://opengameart.org/content/2d-car-sprite-6
		game.load.image('candy', 'assets/img/candy.png');
		//Credits:black car from: https://opengameart.org/content/2d-car-sprite-2
		game.load.image('box', 'assets/img/box.png');
		//Credits: Gameplay song from: https://opengameart.org/content/countdown-to-myocardial-infarction
		game.load.audio('RUN', 'assets/audio/RUN.mp3');
		//Credits: Bark noise from: https://freesound.org/people/NoiseCollector/sounds/4911/
		game.load.audio('bark', 'assets/audio/bark.wav');
		//Credits: Siren noise from: https://freesound.org/people/guitarguy1985/sounds/70938/
		game.load.audio('siren', 'assets/audio/siren.wav');

	},
	//creates the assets
	create: function(){
		console.log('GamePlay: create');
		//plays gameplay music
		rUN = game.add.audio('RUN');
		rUN.play('', 0, 0.25, true);
		//plays bark sound
		bark = game.add.audio('bark');
		//plays siren sound
		siren = game.add.audio('siren');
		//enables the arcade physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//creates background
		farback = game.add.tileSprite(0, 0, 900, 490, 'farback');
		back = game.add.tileSprite(0, 0, 900, 490, 'back');
		front = game.add.tileSprite(0, 0, 900, 490, 'front');
		//  adds ground to the group
   		platforms = game.add.group();
		//  enables body for that group
    	platforms.enableBody = true;
    	// creates the ground
    	var ground = platforms.create(0, game.world.height-10, 'ground');
    	//  scales the ground so it can fit the game width
    	ground.scale.setTo(8, 8);
   		// The ground doesnt fall or move when jumped on
   		ground.body.immovable = true;
   		//  adds van to a group
   		van = game.add.group();
		//  enables the van's body
    	van.enableBody = true;
    	// creates the van
    	var spca = van.create(0, game.world.height-250, 'spca');
		//creates homies and help text
		helpText = game.add.text(6, 6, 'Press Q to Leave', { fontSize: '16px', fill: '#EEE8AA' });
        homiesText = game.add.text(6, 30, 'Homies: 0', { fontSize: '25px', fill: '#EEE8AA' });
        jumpText = game.add.text(6, 60, 'Up Arrow Jump!', { fontSize: '20px', fill: '#EEE8AA' });
        runText = game.add.text(6, 90, 'Right Arrow Run!', { fontSize: '20px', fill: '#EEE8AA' });
        //creates player sprite
		player = game.add.sprite(700,game.world.height-150, 'white');
		//enables physics on player
		game.physics.arcade.enable(player);
		//defines how much gravity and bounce player has.
		player.body.bounce.y = 0.2;
        player.body.gravity.y = 800;
        //enables player to collide against world
        player.body.collideWorldBounds = true;
        //sets anchor point on player to the middle of the sprite
		player.anchor.x = 0.5;
		player.anchor.y = 0.5
		//gives the player animations
		player.animations.add('run', Phaser.Animation.generateFrameNames('run',0, 2, '',1),30, true);
		player.animations.add('idle', ['idle'], 30, false);
		//makes the player bigger
		player.scale.setTo(2,2);
		//enables cursor keys
		cursors = game.input.keyboard.createCursorKeys();
		//adds obstacles to group
		this.obstacles = game.add.group();
		//spawns obstacles every two seconds
		//Had help from TA-April
		game.time.events.loop(Phaser.Timer.SECOND *2, this.spawnObstacles, this);
		//adds doggies to group
    	this.doggies = game.add.group();
    	//spawns doggies every two seconds
    	//Had help from TA-April
    	game.time.events.loop(Phaser.Timer.SECOND *.5, this.spawnDog, this);

	},
	update: function ()
	{
	 	// Allows player to collide with platforms
		var hitPlatform = game.physics.arcade.collide(player, platforms);
		// Moves player left if idle
        player.body.velocity.x = -600;
		//if q is pressed, go to gameover screen
		if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){
			game.state.start('GameOver');
			//stops run from playing
			rUN.stop();
		}
		//if right key is pressed, player runs to the right
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			player.body.velocity.x = 100;
			player.animations.play('run');	
		//else the idle animation plays
		}else{
			player.animations.play('idle');
		}
		//Allows player to jump under certain conditions
		if (cursors.up.isDown && player.body.touching.down && hitPlatform){
			//makes player go up
            player.body.velocity.y = -550;
    	}	
    	//checks if player collides with obstacles
    	game.physics.arcade.collide(player,this.obstacles);
    	//checks if doggie collide against platforms.
    	game.physics.arcade.collide(this.doggies, platforms);
    	//checks if player overlaps with doggie
    	game.physics.arcade.overlap(player, this.doggies, collectDoggies, null, this);
   		//checks if obstacles collide with platforms
    	game.physics.arcade.collide(this.obstacles, platforms);
    	//checks if obstacles collide with doggies
    	game.physics.arcade.collide(this.obstacles, this.doggies);
		//checks if doggies overlap with obstacles
  		game.physics.arcade.overlap(this.doggies, this.obstacles, dieDoggie, null, this);
  		//checks if obstacles collide with other obstacles
  		game.physics.arcade.overlap(this.obstacles, this.obstacles, pleaseWork, null, this);
  		//Function that kills obstacles if they collide with one another
		function pleaseWork(obstacle,obstacle){
  			obstacle.kill();
  			//plays siren sound effect
  			siren.play('', 0, 0.15, false);
  			//console.log("DON'T COLLIDE PLEASE");
  		}
  		//Function that kills doggies if they collide with obstacles.
  		function dieDoggie(doggie,obstacle){
  			doggie.kill();
  			//console.log("DIE DOGG");
  		}
  		//Function that kills doggies if they collide with player
  	  	function collectDoggies (player, doggie) {
    	// Removes the star from the screen
   	 	doggie.kill();
   	 	//plays bark sound effect
   	 	bark.play('', 0, 0.15, false);
    	//  Adds and updates the score
    	homies += 100;
    	homiesText.text = 'Homies: ' + homies;
      }
		//if Player collides with van, goes to game over screen
        var collide =game.physics.arcade.collide(player, van);
   		if(collide){
   			game.state.start('GameOver');
   			rUN.stop();
    	}
    	//moves background
    	farback.tilePosition.x -= 4;
    	back.tilePosition.x -= 5;
    	front.tilePosition.x -= 6;
    

	},
	//Had help from TA April
	//Spawns different types of doggies
	spawnDog: function(){
		var typesOfDoggie = ["gray", "black", "shiba", "chocolate", "blonde"];
		//selects random doggie
		var selectedDoggie = typesOfDoggie[Math.round(Math.random()*4)];
		//console.log("Spawning Doggie! " + selectedDoggie);
		//creates random doggie
		var doggie = this.doggies.create(Math.floor(Math.random()*(2000-1000+1))+1000, game.world.height-100, selectedDoggie);
		//give doggie physics
		game.physics.arcade.enable(doggie);
		doggie.enableBody = true;
        //  gives doggie gravity
        doggie.body.gravity.y = 500;
        //  gives each doggie a random bounce value.
        doggie.body.bounce.y = 0.2;
        //make doggie big
        doggie.scale.setTo(2,2);
        //make doggie move
        doggie.body.velocity.x = -600;
	},
	//Spawns different types of obstacles
	spawnObstacles: function(){
	var typesOfObstacle = ["car", "candy", "box"];
	//selects different types of obstacles
	var selectedObstacle = typesOfObstacle[Math.round(Math.random()*2)];
	//console.log("Spawning obstacle!" + selectedObstacle);
	//creates random obstacles
	var obstacle = this.obstacles.create(Math.floor(Math.random()*(2000-1000+1))+1000, game.world.height-120, selectedObstacle);
	//gives obstacles physics, velocity, etc.
	game.physics.arcade.enable(obstacle);
	obstacle.enableBody = true; 
	//player can't go through obstacles
	obstacle.body.immovable = true;
	obstacle.body.velocity.x = -600;
	},
}

//Defines gameover function
var GameOver = function(game){};
GameOver.prototype = {
	//preloads assets
	preload: function(){
		console.log('GameOver: preload');
		//Credits:Jail cell from:http://pixelartmaker.com/art/fa309debe67cfb7
		game.load.image('jail', 'assets/img/jail.png');
		game.load.image('WhiteOver', 'assets/img/WhiteOver.png');
		//Credits: blues sound from:https://opengameart.org/content/mml-blues
		game.load.audio('blues', 'assets/audio/Blues.ogg');

	},
	//creates assets
	create: function(){
		console.log('GameOver: create');
		//plays blues sound
		blues = game.add.audio('blues');
		blues.play('', 0, 0.25, true);
		//stops gameplay sound from overriding
		//creates background color
		game.stage.backgroundColor = "#000";
		//creates background image
		endImage=game.add.sprite(400, 200, 'WhiteOver');
	    endImage.scale.setTo(3,3);
	    game.add.sprite(290, 150, 'jail');
		//creates text
		gameOva = game.add.text(220, 100, 'The bad men got you, doggy!', { fontSize: '32px', fill: '#FF0000' });
		helpText = game.add.text(320, 380, '(Press Spacebar to startover.)', { fontSize: '16px', fill: '#FF0000' });
	},
	update: function(){
		//if spacebar is pressed, go to main menu.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('MainMenu');
			//stops blues sound
			blues.stop();
		}
	}
}

//adds states and a start function
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');