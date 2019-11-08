class Score {
    constructor(game) {
        this.score = 0
        // this.score = 10
        this.game = game

        this.fonts = []

    }

    static new(game) {
        return new this(game)
    }

    updateFont() {
        // 图片和分数对应
        let game = this.game
        let s = JSON.parse(JSON.stringify(this.score))
        let fonts = []
        let i = 0
        do {
            let n = s % 10
            let name = `font${n}`
            let font = GuaImage.new(game, name)
            font.x = 500 - font.w * i
            font.y = 200
            log(font.x, font.y)
            fonts.push(font)
            s = Math.floor(s / 10)
            i++
        } while (s > 0)

        fonts.reverse()
        // log(fonts)
        this.fonts = fonts
    }

    update() {
        this.updateFont()
    }

    draw() {

        for (let font of this.fonts) {
            font.draw()
        }
    }


}
