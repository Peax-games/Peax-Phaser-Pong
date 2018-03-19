export default function playState() {
    var paddle1;
    var paddle2;
    var ball;
    var ballLaunched = false; //bool to check if launched or not
    var ballVelocity; //speed of ball

    var score1Text;
    var score2Text;

    var score1;
    var score2;

    var aiMaxSpeed;
    
    return {
        init: function (data) {
            aiMaxSpeed = data.maxSpeed || 100;
        },
        create: function () {
            ballLaunched = false;
            ballVelocity = 400;

            paddle1 = this.createPaddle(0, this.game.world.centerY)
            paddle2 = this.createPaddle(this.game.world.width - 8, this.game.world.centerY)
            ball = this.createBall(this.game.world.centerX, this.game.world.centerY);

            this.launchBall();


            score1 = 0;
            score2 = 0;

            score1Text = this.game.add.text(128, 128, '0', {
                font: '64px Gabriella',
                fill: '#fff',
                align: 'center'
            })
            score2Text = this.game.add.text(this.game.world.width - 128, 128, '0', {
                font: '64px Gabriella',
                fill: '#fff',
                align: 'center'
            })
        },
        update: function () {
            score1Text.text = score1;
            score2Text.text = score2;

            this.controlPaddle(paddle1, this.game.input.y);
            this.game.physics.arcade.collide(paddle1, ball);
            this.game.physics.arcade.collide(paddle2, ball);

            if (ball.body.blocked.left) {
                score2 += 1;
                this.scoreLaunch();
            } else if (ball.body.blocked.right) {
                score1 += 1;
                this.scoreLaunchTwo();
            }

            //paddle 2 ai
            paddle2.body.velocity.setTo(ball.body.velocity.y);
            paddle2.body.velocity.x = 0;
            paddle2.body.maxVelocity.y = aiMaxSpeed; //used for difficulty
            if (score1 === 11) {
                this.Win();
            } else if (score2 === 11) {
                this.Lose();
            }

        },
        Win: function () {
            this.game.state.start('win', true, false, {multiplier: aiMaxSpeed});
        },
        Lose: function () {
            this.game.state.start('lose', true, false, {multiplier: aiMaxSpeed});
        },
        createPaddle: function (x, y) {
            var paddle = this.game.add.sprite(x, y, 'paddle');
            paddle.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.enable(paddle);
            paddle.body.collideWorldBounds = true;
            paddle.body.immovable = true;
            paddle.scale.setTo(0.4, 0.4)

            return paddle;
        },

        /* used to control paddle */
        controlPaddle: function (paddle, y) {
            paddle.y = y;

            if (paddle.y < paddle.height / 2) {
                paddle.y = paddle.height / 2;
            } else if (paddle.y > this.game.world.height - paddle.height / 2) {
                paddle.y = this.game.world.height - paddle.height / 2;
            }
        },

        /* used to make the ball*/
        createBall: function (x, y) {
            var ball = this.game.add.sprite(x, y, 'ball');
            ball.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.enable(ball);
            ball.body.collideWorldBounds = true;
            ball.body.bounce.setTo(1.05, 1.05);

            return ball;
        },

        launchBall: function () {
            if (ballLaunched) {
                ball.x = this.game.world.centerX;
                ball.y = this.game.world.centerY;
                ball.body.velocity.setTo(0, 0);
                ballLaunched = false;
            } else {
                ball.body.velocity.x = -ballVelocity;
                ball.body.velocity.y = ballVelocity;
                ballLaunched = true;
            }
        },
        scoreLaunch: function () {
            ball.x = this.game.world.centerX;
            ball.y = this.game.world.centerY;
            ball.body.velocity.x = ballVelocity;
            ball.body.velocity.y = -ballVelocity;
            ballLaunched = true;
        },
        scoreLaunchTwo: function () {
            ball.x = this.game.world.centerX;
            ball.y = this.game.world.centerY;
            ball.body.velocity.x = -ballVelocity;
            ball.body.velocity.y = ballVelocity;
            ballLaunched = true;
        }
    }
}
