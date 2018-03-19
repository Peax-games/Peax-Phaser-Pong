export default function menuState() {
    var textType ={
        font: '14pt Arial',
        fill: '#000',
        align: 'center'
    }
    return {
        create: function () {
            var nameLabel = this.game.add.text(80, 80, 'Pong', { font: '50px Arial', fill: '#fff' });

            this.createButton(this.game, "Single Player", this.game.world.width * 0.5, this.game.world.height * 0.45, 190, 47.4, this.difficulty);

            this.createButton(this.game, "Multipayer", this.game.world.width * 0.5, this.game.world.height * 0.6, 190, 47.4, this.multiplayer);

        },
        difficulty: function () {
            this.game.state.start('difficulty', true, false)
        },
        multiplayer: function () {
            this.game.state.start('difficulty', true, false)
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