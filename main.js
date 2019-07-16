let loadLevel = function(game, n) {
    n = n - 1
    let level = levels[n]
    let blocks = []
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

let enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        let k = event.key
        if (k === 'p') {
            log('按下了暂停')
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 使用滑条控制速度， input 可以动态监控值
    document.querySelector('#id-input-speed').addEventListener('input', function () {
        let input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}
let __main = function () {
    let images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        // run
        run1: 'img/run-01.png',
        run2: 'img/run-02.png',
        run3: 'img/run-03.png',
        run4: 'img/run-04.png',
        run5: 'img/run-05.png',
        run6: 'img/run-06.png',
        // 停止
        idle1: 'img/idle-00.png',
        idle2: 'img/idle-01.png',
        idle3: 'img/idle-02.png',
        idle4: 'img/idle-03.png',
    }
    // 这里有个回调的问题需要加上function, 并将操作放在其中
    let game = GuaGame.instance(30, images, function(game){
        // let s = Scene.new(game)
        let s = SceneTitle.new(game)
        game.runWithScene(s)
    })
    enableDebugMode(game, true)
}
__main()
