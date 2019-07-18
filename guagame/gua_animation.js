class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        // this.frames = []
        // 多种状态
        this.animations = {
            bird: [],
            run: [],
        }
        for (let i = 1; i < 4; i++) {
            let name = `bird${i}`
            let t = game.textureByName(name)
            this.animations['bird'].push(t)
        }
        // for (let i = 1; i < 7; i++) {
        //     let name = `run${i}`
        //     let t = game.textureByName(name)
        //     this.animations['run'].push(t)
        // }
        this.animationsName = 'bird'
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 3
        // 图片的翻转状态
        this.flipX = false
        this.w = this.texture.width
        this.h = this.texture.height
        this.rotation = 45
        // 加速度
        this.gy = 10
        this.vy = 0
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationsName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 3
            // 切换图片下标，防止溢出，使用 %
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
        // 重力
        this.y += this.vy
        this.vy += this.gy * 0.2
        if (this.y > 410) {
            this.y = 410
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
    }
    draw() {
        // this.game.drawImage(this)
        let context = this.game.context
        context.save()
        // 图片角度旋转
        let w2 = this.w / 2
        let h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)

        context.restore()
        // if (this.flipX) {
        //     // 这里是图片翻转
        //     context.save()
        //     let x = this.x + this.w / 2
        //     context.translate(x, 0)
        //     context.scale(-1, 1)
        //     context.translate(-x, 0)
        //     context.drawImage(this.texture, this.x, this.y)
        //     context.restore()
        // } else {
        //     context.drawImage(this.texture, this.x, this.y)
        // }
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        // let names = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // let name = names[keyStatus]
        // this.changeAnimation(name)

    }
    // changeAnimation(name) {
    //     this.animationsName = name
    // }
}
