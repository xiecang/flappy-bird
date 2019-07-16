class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        // 这里有一个 this 的陷阱，可以使用 self 和 箭头函数来避免
        let self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = 'down'

        })
        window.addEventListener('keyup', function(){
            self.keydowns[event.key] = 'up'
        })
        this.init()
    }
    // 单例模式，静态方法, 为了只初始化 guagame 一次
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img) {
        // 这里的 img 是一个 GuaImage
        this.context.drawImage(img.texture, img.x, img.y)
    }
    // 这里如果不使用箭头函数就要在前面 bind
    update() {
        this.scene.update()
    }
    draw() {
        this.scene.draw()
    }
    registerAction(key, callback) {
        log('registerAction: ', key)
        this.actions[key] = callback
    }
    runloop() {
        // log(window.fps)
        let g = this
        // events
        let actions = Object.keys(g.actions)  // 获取到所有的 actions
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            var status = g.keydowns[key]
            if (status === 'down') {
                // 如果按键按下，调用注册的 action 的 callback
                // 并传过去一个状态
                g.actions[key]('down')
            } else if (status === 'up'){
                g.actions[key]('up')
                // 删除这个 key 的状态
                g.keydowns[key] = null
            }
        }
        // update 更新
        g.update()
        // clear 清除画板
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw 画图
        g.draw()
        // next run loop
        // 递归调用
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }
    textureByName(name) {
        let g = this
        let img = g.images[name]
        // let image = {
        //     w: img.width,
        //     h: img.height,
        //     image: img,
        // }
        // return image
        return img
    }
    runWithScene(scene) {
        let g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start(scene) {
        // 第一次运行需要加上 runCallback
        this.runCallback(this)
        // 开始运行程序
        // setTimeout(function () {
        //     runloop()
        // }, 1000 / fps)
        // return g
    }
    init() {
        let g = this
        let loads = []
        // 预先载入所有图片
        let names = Object.keys(g.images)
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
                // 存入 g.image 中
                g.images[name] = img
                // 所有图片载入后执行，调用 run
                loads.push(1)
                // log('载入图片', loads.length, names.length)
                if (loads.length === names.length) {
                    // g.run()
                    g.__start()
                }
            }
        }
    }
}
