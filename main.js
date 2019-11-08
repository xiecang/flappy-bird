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

    // 从配置文件生成 HTML 控件
    insertControls()
    // 绑定事件
    bindEvents()
}

let bindAll = function(sel, eventName, callback) {
    let l = es(sel)
    for (let i = 0; i <l.length; i++) {
        let input = l[i]
        input.addEventListener(eventName, function(event) {
            callback(event)
        })
    }
}

let templateControl = function(key, item) {
    let t = `
                    <div class="">
                        <label>
                            <input class="gua-auto-slider" type="range"
                                max="${item.max}"
                                min="${item.min}"
                                value="${item.value}"
                                data-value="config.${key}"
                            >
                         ${item._comment}: <span class="gua-label">${item.value}</span>
                        </label>
                    </div>
                `
    return t
}

let insertControls = function() {
    let div = e('.gua-controls')
    log(div)
    let keys = Object.keys(config)
    for (let k of keys) {
        let item = config[k]
        let html = templateControl(k, item)
        div.insertAdjacentHTML('beforeend', html)
    }
}

let bindEvents = function() {
    bindAll('.gua-auto-slider', 'input', function (event) {
        let target = event.target
        let bindlet = target.dataset.value
        let v = target.value
        eval(bindlet + '.value =' + v)
        log(v, bindlet)
        let label = target.closest('label').querySelector('.gua-label')
        label.innerText = v
    })
}

let __main = function () {
    let images = {
        // 背景
        cave: 'img/bg_day.png',
        ground: 'img/land.png',
        pipe: 'img/pipe_up.png',
        textReady: 'img/text_ready.png',

        bird0: 'img/bird1_0.png',
        bird1: 'img/bird1_1.png',
        bird2: 'img/bird1_2.png',

        font0: 'img/font_0.png',
        font1: 'img/font_1.png',
        font2: 'img/font_2.png',
        font3: 'img/font_3.png',
        font4: 'img/font_4.png',
        font5: 'img/font_5.png',
        font6: 'img/font_6.png',
        font7: 'img/font_7.png',
        font8: 'img/font_8.png',
        font9: 'img/font_9.png',

        gameOver: 'img/text_game_over.png',
    }
    // 这里有个回调的问题需要加上function, 并将操作放在其中
    let game = GuaGame.instance(30, images, function(game){
        let s = Scene.new(game)
        // let s = SceneTitle.new(game)
        game.runWithScene(s)
    })
    enableDebugMode(game, true)
}
__main()
