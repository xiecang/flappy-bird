class GuaLabel {
    constructor(game, text, x, y, color, fontSize) {
        this.game = game
        this.text = text || ''
        this.x = x || 0
        this.y = y || 0
        this.color = color || 'green'
        this.fontSize = fontSize || 20
    }
    static new(...args) {
        let i = new this(...args)
        return i
    }
    draw() {
        let context = this.game.context

        context.font = this.fontSize + "px serif";
        context.fillStyle = this.color
        context.fillText(this.text, this.x, this.y)
    }
    update() {
    }
}
