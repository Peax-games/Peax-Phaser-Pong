export default function difficultyState(){
    var textType ={
        font: '14pt Arial',
        fill: '#000',
        align: 'center'
    }
    return{
        create: function(){
            var nameLabel = this.game.add.text(80, 80, 'Pong', { font: '50px Arial', fill: '#fff' });
            this.createButton(this.game, "Easy", this.game.world.width * 0.5, this.game.world.height * 0.45, 190, 47.4, this.easy);

            this.createButton(this.game, "Medium", this.game.world.width * 0.5, this.game.world.height * 0.6, 190, 47.4, this.medium);

            this.createButton(this.game, "Hard", this.game.world.width * 0.5, this.game.world.height * 0.75, 190, 47.4, this.hard);

            this.createButton(this.game, "Insane", this.game.world.width * 0.5, this.game.world.height * 0.9, 190, 47.4, this.insane);
        },
        easy: function () {
            this.game.state.start('play', true, false, { maxSpeed: 150 })
        },
        medium: function () {
            this.game.state.start('play', true, false, { maxSpeed: 300 })
        },
        hard: function () {
            this.game.state.start('play', true, false, { maxSpeed: 400 })
        },
        insane: function () {
            this.game.state.start('play', true, false, { maxSpeed: 600 })
        },
        createButton: function (game, string, x, y, w, h, callback) {
            var button1 = game.add.button(x, y, 'button', callback, this, 8, 6,2);
            button1.anchor.setTo(0.5, 0.5);
            button1.width = w;
            button1.height = h;

            var text = game.add.text(
                button1.x, button1.y, string,
                textType
            );
            text.anchor.setTo(0.5, 0.5);
        }
    }
}