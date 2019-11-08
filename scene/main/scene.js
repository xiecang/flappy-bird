class Scene extends GuaScene {
    constructor(game) {
        super(game)
        let label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        // cave
        this.initCave()

        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        // 加入地面
        this.ground = Ground.new(game)
        this.addElement(this.ground)

        this.initBird()

        this.score = Score.new(game)
        this.addElement(this.score)
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
        if(!this.bird.alive) {
            return
        }


        // bird 与 pipe 碰撞检测
        for(let p of this.pipe.pipes) {
            if (p.collide(this.bird)) {
                log("bird 与 pipe 碰撞")
                // this.bird.kill()
                // // 游戏结束
                //
                // this.pipe.kill()
            }
            // 统计分数
            if (p.x  === this.bird.x && p.y > this.bird.y) {
                this.score.score += 1
                log('分数 +1', this.score.score)
            }
        }

        // bird 与 地面 碰撞检测
        for(let g of this.ground.grounds) {
            if (g.collide(this.bird)) {
                // log("bird 与 地面 碰撞")
            }
        }

    }

    setupInputs() {
        let self = this
        let b = this.bird

        self.game.registerAction('a', function(keyStatus) {
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus) {
            b.jump()
        })
    }
}
