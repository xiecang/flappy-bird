class Ground {
    constructor(game) {
        // 循环移动的地面
        this.grounds = []
        for (let i = 0; i < 3; i++) {
            let g = GuaImage.new(game, 'ground')
            g.x = i * 336
            g.y = 450
            this.grounds.push(g)
        }
        this.skipCount = 4
    }

    static new(game) {
        return new this(game)
    }

    update() {
        // 循环让地面移动
        // 当 skipCount == 0 时，反向移动 15，正常情况 -5
        this.skipCount--
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

    draw() {
        for (let g of this.grounds) {
            g.draw()
        }
    }
}