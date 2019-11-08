class Background {
    constructor(game) {
        this.game = game
        this.bgs = []
        this.bgName = 'bg'
        this.setup()
    }

    static new(game) {
        return new this(game)
    }

    setup() {
        let g = this.game

        for (let i = 0; i < 2; i++) {
            let bg = GuaImage.new(g, this.bgName)
            bg.x = i * bg.w
            this.bgs.push(bg)
        }
    }

    draw() {
        for (let b of this.bgs) {
            b.draw()
        }
    }

    update() {

    }
}