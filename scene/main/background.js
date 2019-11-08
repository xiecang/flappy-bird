class Background {
    constructor(game) {
        this.game = game
        this.bgName = 'bg'
        this.setup()
    }

    static new(game) {
        return new this(game)
    }

    setup() {
        let g = this.game
        this.bgs = []
        // log('bgName', this.bgName)
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

    replaceToNight() {
        this.bgName = 'bgNight'
        this.setup()
        // log(this.bgs)
    }

    replaceToDay() {
        this.bgName = 'bg'
        this.setup()
    }

}