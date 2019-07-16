class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        // this.frames = []
        // 多种状态
        this.animations = {
            idle: [],
            run: [],
        }
        for (let i = 1; i < 4; i++) {
            let name = `idle${i}`
            let t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        for (let i = 1; i < 7; i++) {
            let name = `run${i}`
            let t = game.textureByName(name)
            this.animations['run'].push(t)
        }
        this.animationsName = 'idle'
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 3
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationsName]
    }
    update() {
        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 3
            // 切换图片下标，防止溢出，使用 %
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        this.game.drawImage(this)
    }
    move(x, keyStatus) {
        this.x += x
        let names = {
            down: 'run',
            up: 'idle',
        }
        let name = names[keyStatus]
        this.changeAnimation(name)

    }
    changeAnimation(name) {
        this.animationsName = name
    }

}
