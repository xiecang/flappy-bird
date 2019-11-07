class Countdown extends GuaAnimation {
    constructor(game) {
        super(game, {
            textures: [{
                animationName: 'font',
                animationNum: 4,
                reverse: true
            }],
            animationsName: 'font',
        })

        this.cooldown = 0
    }

    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        }

        if (this.cooldown === 0) {
            super.update()
            this.cooldown = 10
        }

        if (this.frameIndex === 3) {
            let s = Scene.new(this.game)
            this.game.replaceScene(s)
        }
    }
}