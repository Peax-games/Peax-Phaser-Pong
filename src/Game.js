// import Reat, {Component} from 'react'

window.PIXI = require('phaser-ce/build/custom/pixi');
window.p2 = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

export default function Maze() {
    var game = new window.Phaser.Game(600, 400, window.Phaser.AUTO, null, {
        preload: preload, create: create, update: update
    });

    var paddle1;
    var paddle2;
    var ball;
    var ballLaunched; //bool to check if launched or not
    var ballVelocity; //speed of ball

    var score1Text;
    var score2Text;

    var score1;
    var score2;

    function preload() {
        game.scale.scaleMode = window.Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        //game.stage.backgroundColor = '#eee';

        game.load.image('paddle', 'img/paddle.png' )
        game.load.image('ball', 'img/ball.png')

        // game.load.audio('hit1', ['img/hit_1.ogg', 'img/hit_1.wav'])
        // game.load.audio('hit2', ['img/hit_2.ogg', 'img/hit_2.wav'])
    }
    function create() {
        ballLaunched = false;
        ballVelocity = 400;

        paddle1 = createPaddle(0, game.world.centerY)
        paddle2 = createPaddle(game.world.width -8, game.world.centerY)
        ball = createBall(game.world.centerX, game.world.centerY);

        game.input.onDown.add(launchBall, this);


        score1 = 0;
        score2 = 0;

        score1Text = game.add.text(128, 128, '0', {
            font:'64px Gabriella',
            fill: '#fff',
            align: 'center'
        })
        score2Text = game.add.text(game.world.width - 128, 128, '0', {
            font:'64px Gabriella',
            fill: '#fff',
            align: 'center'
        })

    }
    function update() {

        score1Text.text = score1;
        score2Text.text = score2;

        controlPaddle(paddle1, game.input.y);
        game.physics.arcade.collide(paddle1, ball);
        game.physics.arcade.collide(paddle2, ball);

        if(ball.body.blocked.left){
            score2+=1;
        }else if (ball.body.blocked.right){
            score1+=1;
        }

        //paddle 2 ai
        paddle2.body.velocity.setTo(ball.body.velocity.y);
        paddle2.body.velocity.x = 0;
        paddle2.body.maxVelocity.y = 100;

        
    }

    /* used to create paddle */
    function createPaddle(x, y){
        var paddle = game.add.sprite(x, y, 'paddle');
        paddle.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(paddle);
        paddle.body.collideWorldBounds = true;
        paddle.body.immovable = true;
        paddle.scale.setTo(0.4, 0.4)

        return paddle;
    }

    /* used to control paddle */
    function controlPaddle(paddle, y){
        paddle.y = y;

        if(paddle.y < paddle.height/2){
            paddle.y = paddle.height/2;
        } else if(paddle.y> game.world.height - paddle.height/2){
            paddle.y = game.world.height - paddle.height/2;
        }
    }
/* used to make the ball*/
    function createBall(x, y){
        var ball = game.add.sprite(x, y, 'ball');
        ball.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(ball);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.setTo(1, 1);

        return ball;
    }
    function launchBall(){
        if(ballLaunched){
            ball.x = game.world.centerX;
            ball.y = game.world.centerY;
            ball.body.velocity.setTo(0,0);
            ballLaunched = false;
        }else{
            ball.body.velocity.x = -ballVelocity;
            ball.body.velocity.y = ballVelocity;
            ballLaunched = true;
        }
    }


}