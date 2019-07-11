class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            let s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    // 使用 SceneTitle.new() 替代 new SceneTitle() 使用方式
    // static new(game) {
    //     let i = new this(game)
    //     return i
    // }
    draw() {
        // draw lables
        this.game.context.fillText('游戏结束，按 r 再来一次', 100, 190)
    }

}
