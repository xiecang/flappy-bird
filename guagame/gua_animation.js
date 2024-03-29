class GuaAnimation {
    constructor(game, animationConfig) {
        /*
        let animationConfig = {
           textures: [{
               animationName: 'bird',
               animationNum: 4,
               reverse: false
           }],
           animationsName: 'bird'
       }
        */

        this.game = game

        // 初始化 animations
        this.animations = this.initAnimations(animationConfig)

        // 初始化动画图片
        let fs = this.frames()
        if (fs === undefined || this.animationsName === undefined) {
            log("未正确初始化 GuaAnimation")
            return
        }
        this.texture = fs[0]
        this.frameIndex = 0
        this.frameCount = 3
        this.w = this.texture.width
        this.h = this.texture.height

        // 图片的翻转状态
        this.flipX = false

        this.rotation = 0

        this.alive = true
        this.lives = 3
    }

    static new(game) {
        return new this(game)
    }

    initAnimations(animationConfig) {
        /*
       let animationConfig = {
           textures: [{
               animationName: 'bird',
               animationNum: 4,
               reverse: false
           }],
           animationsName: 'bird'
       }
       */
        let texturesInfo = animationConfig.textures
        let game = this.game
        let animations = {}
        for (let info of texturesInfo) {
            let animationName = info.animationName
            let num = info.animationNum
            let reverse = info.reverse || false
            animations[animationName] = []
            for (let i = 0; i < num; i++) {
                let name = `${animationName}${i}`
                let t = game.textureByName(name)
                animations[animationName].push(t)
            }
            if (reverse) {
                animations[animationName].reverse()
            }
        }
        this.animationsName = animationConfig.animationsName
        return animations

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

    }


    collide(image) {
        let i = image
        let o = this
        return o.alive && (rectIntersects(o, i) || rectIntersects(i, o))
    }

    kill() {
        this.alive = false
    }

    changeAnimation(name) {
        this.animationsName = name
    }
}
