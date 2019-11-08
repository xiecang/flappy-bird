class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInput()
    }

    setup() {
        // 画背景

        // 画分数
    }

    setupInput() {
        let game = this.game
        game.registerAction('r', function () {
            let s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.drawLabel("按 r 再来一次", 200, 300, 'green', 20)
        // 画结束场景
    }

}
