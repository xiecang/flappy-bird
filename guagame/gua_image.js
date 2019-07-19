class GuaImage {
    constructor(game, name) {
        this.game = game
        // 图片
        this.texture = game.textureByName(name)
        // log(this.texture)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height

        this.flipY = false
        this.rotation = 0
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
}
