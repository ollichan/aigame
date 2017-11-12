var game = new Phaser.Game(1290, 720, Phaser.CANVAS,'',{preload: preload, create: create, update: update});

function preload() {
    game.load.image('background','assets/images/background.jpg')
}

function create() {
    game.add.sprite(0,0, 'background');
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //player
    player = game.add.sprite(playerX, playerY, 'spritesheet', 'character/solider/walkLeft/0001');
    player.scale.setTo(2,2);
    player.anchor.x=0.5;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.bounce.set(0.2);
    player.body.allowGravity = false;
    player.animations.add('left', Phaser.Animation.generateFrameNames('character/solider/walkLeft/', 1, 6, '', 4), 10, true, false);
    player.animations.add('right', Phaser.Animation.generateFrameNames('character/solider/walkRight/', 1, 6, '', 4), 10, true, false);
    isAttackingAnimLeft = player.animations.add('aleft', Phaser.Animation.generateFrameNames('character/solider/attackLeft/', 1, 3, '', 4), 10, true, false);
    isAttackingAnimRight = player.animations.add('aright', Phaser.Animation.generateFrameNames('character/solider/attackRight/', 1, 3, '', 4), 10, true, false);
    isDieAnimLeft = player.animations.add('dleft', Phaser.Animation.generateFrameNames('character/solider/dieLeft/', 5, 5, '', 4), 10, true, false);
    isDieAnimRight = player.animations.add('dright', Phaser.Animation.generateFrameNames('character/solider/dieRight/', 5, 5, '', 4), 10, true, false);
    isAttackingAnimLeft.onStart.add(attackLeftAnimationStarted, this);
    isAttackingAnimLeft.onLoop.add(attackLeftAnimationLooped, this);
    isAttackingAnimLeft.onComplete.add(attackLeftStop, this);
    isAttackingAnimRight.onStart.add(attackRightAnimationStarted, this);
    isAttackingAnimRight.onLoop.add(attackRightAnimationLooped, this);
    isAttackingAnimRight.onComplete.add(attackRightStop, this);
    isDieAnimLeft.onStart.add(dieLeftAnimationStarted,this)
    isDieAnimLeft.onLoop.add(dieLeftAnimationLooped,this);
    isDieAnimLeft.onComplete.add(dieLeftStop,this);
    isDieAnimRight.onStart.add(dieRightAnimationStarted,this)
    isDieAnimRight.onLoop.add(dieRightAnimationLooped,this);
    isDieAnimRight.onComplete.add(dieRightStop,this);

}

function update(){

}


