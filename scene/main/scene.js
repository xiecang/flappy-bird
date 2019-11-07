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
        // 循环移动的地面
        this.grounds = []
        this.numberOfGroud = 3
        for (let i = 0; i < this.numberOfGroud; i++) {
            let g = GuaImage.new(game, 'ground')
            g.x = i * g.w
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
        if(!this.bird.alive) {
            return
        }
        // 循环让地面移动
        // 当 skipCount == 0 时，反向移动 15，正常情况 -5
        this.skipCount --
        this.offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 4
            this.offset = 15
        }
        for (let i = 0; i < 3; i++) {
            let g = this.grounds[i]
            g.x += this.offset
        }

        // // bird 与 pipe 碰撞检测
        // for(let p of this.pipe.pipes) {
        //     if (p.collide(this.bird)) {
        //         log("bird 与 pipe 碰撞")
        //         this.bird.kill()
        //         // 游戏结束
        //
        //         this.pipe.kill()
        //     }
        // }
        //
        // // bird 与 地面 碰撞检测
        // for(let g of this.grounds) {
        //     if (g.collide(this.bird)) {
        //         // log("bird 与 地面 碰撞")
        //     }
        // }

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
