class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModelEnable = true
        this.elements = []
    }

    static new(game) {
        let i = new this(game)
        return i
    }

    draw() {
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            // this.game.drawImage(e)
            // 进一步抽象 调用元素的 draw()
            e.draw()
        }
    }

    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }

    deleteElement(img) {
        img.scene = this
        let index = this.elements.indexOf(img)
        this.elements.splice(index, 1)
    }

    update() {
        this.debug && this.debug()
        if (this.debugModelEnable) {
            for (let i = 0; i < this.elements.length; i++) {
                const e = this.elements[i]
                e.debug && e.debug()
            }
        }

        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.update()
        }
    }
}
