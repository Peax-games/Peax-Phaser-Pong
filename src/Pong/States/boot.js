export default function bootState(){
    return{
        preload: function () {
            this.load.image('preloaderBackground', 'img/menu-stuffs/preloadbck.png');
            this.load.image('preloaderBar', 'img/menu-stuffs/preloadbar.png');
        },
        create: function(){
            this.game.physics.startSystem(window.Phaser.Physics.ARCADE);
            //makes the game center in the div
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            if (this.game.device.desktop) {

                //code for desktop devices
                this.game.scale.scaleMode = window.Phaser.ScaleManager.SHOW_ALL;
            } else {
                //code for mobile devices

              this.game.scale.startFullScreen(false);
               this.game.scale.fullScreenScaleMode = window.Phaser.ScaleManager.SHOW_ALL;
               
            };
            this.game.state.start('load');
        }
    }
}