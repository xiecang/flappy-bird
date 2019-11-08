class Score {
    constructor(game) {
        this.score = 0
        // this.score = 10
        this.game = game

        this.fonts = []
        this.initStorage()

        this.alive = true
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
            fonts.push(font)
            s = Math.floor(s / 10)
            i++
        } while (s > 0)

        fonts.reverse()
        // log(fonts)
        this.fonts = fonts
    }

    update() {
        if (!this.alive) {
            return
        }
        this.updateFont()
    }

    draw() {

        for (let font of this.fonts) {
            font.draw()
        }
    }

    initStorage() {
        let s = JSON.stringify({
            score: 0,
            bestScore: 0,
        })
        localStorage.flappyBird = s
    }

    save() {
        /**
         {
            score: this.score,
            bestScore: '',
         }
         */
        let s = Score.load()
        this.bestScore = Math.max(s.bestScore, this.score)

        s = {
            score: this.score,
            bestScore: this.bestScore,
        }
        s = JSON.stringify(s)
        localStorage.flappyBird.scores = s
    }

    static load() {
        let scores = localStorage.flappyBird
        let s = JSON.parse(scores)
        return s
    }

    kill() {
        this.alive = false
        this.game.scene.deleteElement(this)
    }

}
