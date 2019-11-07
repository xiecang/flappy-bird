class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        // cave
        this.initCave()

        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        this.pipe.kill()

        this.ground = Ground.new(game)
        this.addElement(this.ground)

        this.initBird()

        this.textReady = GuaImage.new(this.game, 'textReady')
        this.addElement(this.textReady)

        this.setupInputs()
    }

    debug() {
        this.birdSpeed = config.birdSpeed.value
    }

    initBird() {
        let game = this.game
        let bird = Bird.new(game)
        bird.x = 100
        bird.y = 200
        this.bird = bird
        this.birdSpeed = 2
        this.addElement(bird)
        this.bird.kill()
    }

    initCave() {
        for (let i = 0; i < 2; i++) {
            let cave = GuaImage.new(this.game, 'cave')
            cave.x = i * cave.w
            this.addElement(cave)
        }
    }

    update() {
        super.update()

        // 画教程
        this.drawLabel("按k开始游戏")
    }

    setupInputs() {
        let self = this

        self.game.registerAction('k', function (keyStatus) {
            // 加入倒计时
            let countDown = Countdown.new(self.game)
            countDown.x = 260
            countDown.y = 200
            self.addElement(countDown)
        })
    }

}
