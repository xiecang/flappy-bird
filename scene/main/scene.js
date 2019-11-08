class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
        let game = this.game
        let label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        // bg
        this.initBackground()


        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        // 加入地面
        this.ground = Ground.new(game)
        this.addElement(this.ground)

        // 初始化小鸟
        this.initBird()

        // 初始化分数
        this.score = Score.new(game)
        this.addElement(this.score)
    }


    setupInputs() {
        let self = this
        let b = this.bird

        self.game.registerAction('a', function (keyStatus) {
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus) {
            b.jump()
        })
        self.game.registerAction('r', function (keyStatus) {
            let s = SceneTitle.new(self.game)
            self.game.replaceScene(s)
        })
    }

    debug() {
        this.birdSpeed = config.birdSpeed.value
    }

    initBackground() {
        this.bg = Background.new(this.game)
        this.addElement(this.bg)
    }

    initBird() {
        let game = this.game
        let bird = Bird.new(game)
        bird.x = 100
        bird.y = 200
        this.bird = bird
        this.birdSpeed = 2
        this.addElement(bird)
    }

    update() {
        super.update()
        let game = this.game

        if (!this.bird.alive) {
            return
        }

        // bird 与 pipe 碰撞检测
        for (let p of this.pipe.pipes) {
            if (p.collide(this.bird)) {
                log("bird 与 pipe 碰撞")
                // 添加结束动画
                this.updateEnd()
                return
            }
            // 统计分数
            if (p.x === this.bird.x && p.y > this.bird.y) {
                this.score.score += 1
                log('分数 +1', this.score.score)
                this.score.save()
            }
        }

        // bird 与 地面 碰撞检测
        for (let g of this.ground.grounds) {
            if (g.collide(this.bird)) {
                // log("bird 与 地面 碰撞")

                // 添加结束动画
                this.updateEnd()
                return
            }
        }

    }

    updateEnd() {
        let game = this.game
        this.bird.kill()
        this.pipe.kill()
        this.score.kill()

        // 小鸟下坠
        this.bird.y--
        if (this.bird.y > 410) {
            this.bird.y = 410
        }

        // 背景变为黑色
        this.bg.replaceToNight()

        // 画结束场景
        this.gameOver = GameOver.instance(game)
        this.addElement(this.gameOver)
    }


}

