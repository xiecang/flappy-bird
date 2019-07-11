class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        let label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        // let particle = GuaParticleSystem.new(game)
        // this.addElement(particle)
        let r = GuaAnimation.new(game)
        r.x = 100
        r.y = 200
        this.addElement(r)
    }
}
