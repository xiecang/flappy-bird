class GameOver extends GuaImage {
    constructor(game) {
        super(game, 'gameOver')
        this.x = 200
        this.y = -this.w

        this.score = null
        this.scores = []
        this.bestScores = []

    }

    move() {
        this.y += 5
    }

    draw() {
        super.draw()
        // 当前分数
        for (let e of this.scores) {
            e.draw()
        }
        // 最好分数
        for (let e of this.bestScores) {
            // log('draw bestScores')
            e.draw()
        }
        this.scorePanel && this.scorePanel.draw()
    }

    update() {
        super.update()
        let g = this.game
        if (this.y < 100) {
            this.move()
        } else {
            // score panel
            let scorePanel = GuaImage.instance(g, 'scorePanel')
            scorePanel.x = 180
            scorePanel.y = 200
            this.scorePanel = scorePanel

            // 展示分数
            if (this.score === null) {
                this.score = Score.load()
            }
            // 当前分数
            let s = this.score.score
            this.scores = this.showScoreByNum(s, 100, 200)
            // 最好分数
            let bestScore = this.score.bestScore
            this.bestScores = this.showScoreByNum(bestScore, 120, 200)
            // log(bestScore, this.bestScores)

        }
    }

    showScoreByNum(score, scoreX, scoreY) {
        let game = this.game
        let fonts = []
        let s = JSON.parse(JSON.stringify(score))
        let i = 0
        do {
            let n = s % 10
            let name = `numberScore${n}`
            let font = GuaImage.new(game, name)
            font.x = scoreX - font.w * i
            font.y = scoreY
            fonts.push(font)
            s = Math.floor(s / 10)
            i++
        } while (s > 0)

        fonts.reverse()
        return fonts
    }

}