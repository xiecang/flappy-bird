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

        let g = GuaImage.new(game, 'ground')
        g.x = 0
        g.y = 450
        this.g = g
        this.addElement(g)

        let bird = GuaAnimation.new(game)
        bird.x = 100
        bird.y = 200
        this.bird = bird
        this.addElement(bird)

        this.setupInputs()
    }
    update() {
        super.update()
        let g = this.g
        g.x -= 5
    }

    setupInputs() {
        let self = this
        let b = this.bird

        self.game.registerAction('a', function(keyStatus) {
            // 这样是错误的，在回调中不能使用 this
            // this.r.move(2)
            b.move(-2, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(2, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus) {
            b.jump()
        })
    }
}
