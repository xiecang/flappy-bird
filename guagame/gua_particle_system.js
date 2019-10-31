class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'particle')
        this.setUp()
    }
    setUp() {
        this.life = 10
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        let factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}


class GuaParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.setup(x, y)
    }
    static new(game, x, y) {
        return new this(game, x, y)
    }
    setup(x, y) {
        this.duration = config.particle_system_duration.value || 20
        this.x = x
        this.y = y
        this.numberOfParticles = config.number_of_particles.value || 5
        this.particles = []
    }
    update() {
        this.duration--
        if (this.duration < 0) {

        }
        if (this.particles.length < this.numberOfParticles) {
            let p = GuaParticle.new(this.game)

            let s = 3
            let vx = randomBetween(-s, s)
            let vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }

        for (let p of this.particles) {
            p.update()
        }

        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            this.game.scene.deleteElement(this)
            return
        }
        for (let p of this.particles) {
            p.draw()
        }
    }
}
