class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        let label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        let particle = GuaParticleSystem.new(game)
        this.addElement(particle)
    }
}
