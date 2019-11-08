class GuaImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.alive = true
        this.lives = 1
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    static new(game, name) {
        let i = new this(game, name)
        return i
    }

    draw() {
        this.game.drawImage(this)
    }

    update() {

    }

    collide(image) {
        let i = image
        let o = this
        return o.alive && (rectIntersects(o, i) || rectIntersects(i, o))
    }

    hasPoint(x, y) {
        // 判断一个点是否在矩形内(点击的点)
        let o = this

        let xIn = x >= o.x && x <= o.x + o.w
        let yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }

    kill() {
        let o = this
        if (!o.alive) {
            return
        }
        o.lives--
        if (o.lives === 0) {
            o.alive = false
            this.game.scene.deleteElement(this)
        }
    }
}
