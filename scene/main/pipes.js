class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        // 管子竖向间距
        this.pipeSpace = 150
        // 管子横向间距
        this.pipeSpaceX = 200
        this.columsOfPipe = 10
        // 初始管子横轴位置
        this.initPipeX = 600
        for (let i = 0; i < this.columsOfPipe; i++) {
            let p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = this.initPipeX  + i * 200
            let p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }

        this.alive = true
    }

    static new(game) {
        return new this(game)
    }

    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-280, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }

    update() {
        if (this.alive) {
            this.move()
        }
    }

    move() {
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
            let p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.pipeSpaceX * this.columsOfPipe - this.initPipeX + 100
            }
            if (p2.x < -100) {
                p2.x += this.pipeSpaceX * this.columsOfPipe - this.initPipeX + 100
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

    kill() {
        this.alive = false
    }
}