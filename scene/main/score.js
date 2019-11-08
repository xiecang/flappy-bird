class Score {
    constructor(game) {
        // this.score = 0
        this.score = 10
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
        while (s > 0) {
            let n = s % 10
            let name = `font${n}`
            let font = GuaImage.new(game, name)
            font.x = 300 + font.w * 2 + 5
            font.y = 200
            fonts.push(font)
            s = Math.floor(s / 10)
        }
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
