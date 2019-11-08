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
        this.y += config.gameOverTextSpeed.value
    }

    draw() {
        super.draw()
        this.scorePanel && this.scorePanel.draw()

        // 当前分数
        for (let e of this.scores) {
            e.draw()
        }
        // 最好分数
        for (let e of this.bestScores) {
            // log('draw bestScores')
            e.draw()
        }

        this.restartText && this.restartText.draw()
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
            let scoreX = config.finalScoreX.value
            let scoreY = config.finalScoreY.value
            this.scores = this.showScoreByNum(s, scoreX, scoreY)
            // 最好分数
            let bestScore = this.score.bestScore
            let bestScoreX = config.bestScoreX.value
            let bestScoreY = config.bestScoreY.value
            this.bestScores = this.showScoreByNum(bestScore, bestScoreX, bestScoreY)
            // log(bestScore, this.bestScores)

            this.restartTextX = 240
            this.restartTextY = 180
            this.restartText = GuaLabel.new(g, "按 r 再来一次", this.restartTextX, this.restartTextY, 'yellow', 20)

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