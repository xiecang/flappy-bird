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

        // let g = GuaImage.new(game, 'ground')
        // g.x = 0
        // g.y = 450
        // this.g = g
        // this.addElement(g)
        this.grounds = []
        for (let i = 0; i < 3; i++) {
            let g = GuaImage.new(game, 'ground')
            g.x = i * 336
            g.y = 450
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4

        let bird = GuaAnimation.new(game)
        bird.x = 100
        bird.y = 200
        this.bird = bird
        this.addElement(bird)

        this.setupInputs()
    }
    update() {
        super.update()
        super.update()
        // 循环让地面移动
        // 当 skipCount == 0 时，反向移动 15，正常情况 -5
        this.skipCount --
        this.offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 4
            this.offset = 15
        }
        for (let i = 0; i < 3; i++) {
            let g = this.grounds[i]
            g.x += this.offset
        }
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
