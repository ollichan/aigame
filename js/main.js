var game = new Phaser.Game(960, 540, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('background','assets/images/background.jpg');
    game.load.atlas('spritesheet','assets/images/spritesheet.png','assets/images/spritesheet.json');
}

var player;
var playerX=285,playerY=285;
var cursors;
var BGM=new Audio("assets/audio/LLOP2.mp3");
BGM.load();

function create() {
    game.add.sprite(0,0, 'background');
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //BGM
    BGM.play();
    BGM.loop = true;

    // animation
    cursors = game.input.keyboard.createCursorKeys();

    startScreen();

    resize();
    //player
    player = game.add.sprite(playerX, playerY, 'spritesheet', 'sprites/stealer/stand/stealer_stand_left_1.png');
    player.scale.setTo(0.1,0.1);
    player.anchor.x=0.5;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.bounce.set(0.2);
    player.body.allowGravity = false;
    player.animations.add('left', Phaser.Animation.generateFrameNames('sprites/stealer/walk_left/', 1, 8, '', 4), 10, true, false);
    player.animations.add('right', Phaser.Animation.generateFrameNames('sprites/stealer/walk_left/', 1, 8,'', 4), 10, true, false);

}

var playerIsLeftDirection=false;
var moverSpeed = 150;
var creationMutex = false;

function update(){
    playerControll();
}

function resize(){
    widthRatio = game.width / 960;
    heightRatio = game.height / 540;
    game.stage.backgroundColor = "#FFFFFF";
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignVertically = true;
    game.scale.setScreenSize( true );
}

function playerControll(){
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if(cursors.up.isDown&&cursors.left.isDown){
        player.body.velocity.x = -moverSpeed;
        player.body.velocity.y = -moverSpeed;
        playerIsLeftDirection = true;
        player.animations.play('left',false);

    }else if(cursors.down.isDown&&cursors.left.isDown){
        player.body.velocity.x = -moverSpeed;
        player.body.velocity.y = moverSpeed;
        playerIsLeftDirection = true;
        player.animations.play('left',false);
    }else if(cursors.up.isDown&&cursors.right.isDown){
        player.body.velocity.x = moverSpeed;
        player.body.velocity.y = -moverSpeed;
        playerIsLeftDirection = false;
        player.animations.play('right',false);
    }else if(cursors.down.isDown&&cursors.right.isDown){
        player.body.velocity.x = moverSpeed;
        player.body.velocity.y = moverSpeed;
        playerIsLeftDirection = false;
        player.animations.play('right',false);
    }else if(cursors.up.isDown){
        player.body.velocity.y = -moverSpeed;
        if(playerIsLeftDirection)
            player.animations.play('left',false);
        else
            player.animations.play('right',false);

    }
    else if(cursors.down.isDown){
        player.body.velocity.y = moverSpeed;
        if(playerIsLeftDirection)
            player.animations.play('left',false);
        else
            player.animations.play('right',false);

    }
    else if (cursors.left.isDown)
    {
        player.body.velocity.x = -moverSpeed;
        playerIsLeftDirection = true;
        player.animations.play('left',false);

    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = moverSpeed;
        playerIsLeftDirection = false;
        player.animations.play('right',false);

    }
    else
    {
        player.animations.stop();
        player.frame = 0;
    }
}

function startScreen(){
    instructionText = game.add.text(game.world.centerX+240,game.world.centerY-20,' ', { font: '38px Arial', fill: '#FFF' ,boundsAlignH: "left", boundsAlignV: "middle"});
    instructionText.anchor.setTo(0.5, 0.5);
    instructionText.visible = true;
    instructionText.text = "Welcome to God Steal\nPress arrow key to move\n";
    instructionText.stroke = '#6d6d6d';
    instructionText.strokeThickness = 4;
}