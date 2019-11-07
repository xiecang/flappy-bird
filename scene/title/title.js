class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        // cave
        this.initCave()

        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        this.pipe.kill()
        // 循环移动的地面

        this.grounds = []
        for (let i = 0; i < 3; i++) {
            let g = GuaImage.new(game, 'ground')
            g.x = i * 336
            g.y = 450
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4

        // let bird = GuaAnimation.new(game)
        let bird = Bird.new(game)
        bird.x = 100
        bird.y = 200
        this.bird = bird
        this.birdSpeed = 2
        this.addElement(bird)

        this.bird.kill()

        this.textReady = GuaImage.new(this.game, 'textReady')


        this.setupInputs()
    }

    debug() {
        this.birdSpeed = config.birdSpeed.value
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
        // 播放倒计时

        // 倒计时结束后，bird alive, 地面循环移动

        //

        // 循环让地面移动
        // 当 skipCount == 0 时，反向移动 15，正常情况 -5
        this.skipCount--
        this.offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 4
            this.offset = 15
        }
        for (let i = 0; i < 3; i++) {
            let g = this.grounds[i]
            g.x += this.offset
        }


    }

    setupInputs() {
        let self = this

        self.game.registerAction('k', function (keyStatus) {
            // 加入倒计时
            let countDown = Countdown.new(self.game)
            countDown.x = 260
            countDown.y = 200
            self.addElement(countDown)
            // this.
        })
    }

    draw() {
        super.draw()
        this.drawStart()
    }

    drawStart() {
        this.textReady.draw()
    }
}
