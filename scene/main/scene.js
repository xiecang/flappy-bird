class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = config.player_speed
        log('player speed', this.speed)
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown --
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    fire() {
        if (this.cooldown === 0) {
            this.cooldown = config.cooldown
            let x = this.x + this.w / 2
            let y = this.y
            let b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }

}

// 随机取整数
const randomBetween = function(start, end) {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

class Enemy extends GuaImage {
    constructor(game) {
        let type = randomBetween(0, 4)
        let name = 'enemy' + type
        super(game, name)
        this.setup()

    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        // this.y = 0
        this.y = randomBetween(0, -250)
    }
    update() {
        this.y += this.speed
        // this.y += config.enemy_speed
        if (this.y > 600) {
            this.setup()
        }
    }
    // debug() {
    //     this.y += config.enemy_speed
    // }
}

class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()

    }
    setup() {
        // this.speed = config.cloud_speed
        this.speed = 1
        this.x = randomBetween(0, 150)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 400 || this.y < -400) {
            this.setup()
        }
    }
    debug() {
        this.y += config.cloud_speed
    }
}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        // 这里使用 config.bullet_speed 会使当前发射的 bullet 速度改变
        this.speed = config.bullet_speed
    }
    update() {
        // 这里使用 config.bullet_speed 会使当前画面的全部 bullet 速度改变
        this.y -= this.speed
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        this.bg = GuaImage.new(this.game, 'sky')
        this.cloud = Cloud.new(this.game, 'cloud')

        this.player = Player.new(this.game)
        this.player.x = 100
        this.player.y = 200

        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)

        // 添加敌人
        this.numberOfEnemies = 10
        this.addEnemies()
    }
    update() {
        super.update()
        this.cloud.y += 1
    }
    setupInputs() {
        let g = this.game
        let s = this

        // log('g: ', g, 's: ', s, 'this: ', this)
        // 这里只能这样写, 注释的不能运行 TypeError: this.player is undefined
        // this.game.registerAction('a', function () {
        //     this.player.moveLeft()
        // })
        g.registerAction('a', function () {
            s.player.moveLeft()
        })
        g.registerAction('d', function () {
            s.player.moveRight()
        })
        g.registerAction('w', function () {
            s.player.moveUp()
        })
        g.registerAction('s', function () {
            s.player.moveDown()
        })
        g.registerAction('f', function () {
            s.player.fire()
        })
    }
    addEnemies() {
        let es = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
            let e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        // 保存es
        this.enemies = es
    }
}
