class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        let label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        // let particle = GuaParticleSystem.new(game)
        // this.addElement(particle)
        // cave
        let cave = GuaImage.new(game, 'cave')
        this.addElement(cave)

        let r = GuaAnimation.new(game)
        r.x = 100
        r.y = 200
        this.r = r
        this.addElement(r)
        this.setupInputs()
    }
    setupInputs() {
        let self = this
        self.game.registerAction('a', function(keyStatus) {
            // 这样是错误的，在回调中不能使用 this
            // this.r.move(2)
            self.r.move(-2, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            self.r.move(2, keyStatus)
        })

    }
}
