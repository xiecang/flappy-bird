class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        // 管子竖向间距
        this.pipeSpace = 150
        // 管子横向间距
        this.pipeSpaceX = 200
        this.columsOfPipe = 3
        for (let i = 0; i < this.columsOfPipe; i++) {
            let p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * 200
            let p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-280, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    update() {
        // for (let p of this.pipes) {
        //     p.x -= 5
        //     if (p.x < -100) {
        //         log(p.x)
        //         p.x += this.pipeSpaceX * this.columsOfPipe
        //         log(p.x)
        //     }
        // }
        // 设置管子的间距
        for (let i = 0; i < this.pipes.length / 2; i += 2) {
            let p1 = this.pipes[i]
            let p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.pipeSpaceX * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.pipeSpaceX * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }

    }
    debug() {
        this.pipeSpaceX = config.pip_spaceX.value
        this.pipeSpace = config.pip_space.value
        // log(this.pipeSpaceX)
    }

    draw() {
        // this.game.drawImage(this)
        let context = this.game.context
        for (let p of this.pipes) {
            context.save()
            // 图片角度旋转
            let w2 = p.w / 2
            let h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            let scaleX = p.flipX ? -1 : 1
            let scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        let label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        // let particle = GuaParticleSystem.new(game)
        // this.addElement(particle)
        // cave
        let cave = GuaImage.new(game, 'cave')
        this.addElement(cave)

        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
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

        let bird = GuaAnimation.new(game)
        bird.x = 100
        bird.y = 200
        this.bird = bird
        this.addElement(bird)

        this.setupInputs()
    }
    update() {
        super.update()
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
    }

    setupInputs() {
        let self = this
        let b = this.bird

        self.game.registerAction('a', function(keyStatus) {
            // 这样是错误的，在回调中不能使用 this
            // this.r.move(2)
            b.move(-2, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(2, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus) {
            b.jump()
        })
    }
}
