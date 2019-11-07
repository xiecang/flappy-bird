class Bird extends GuaAnimation {
    constructor(game) {
        super(game, [{
            animationName: 'bird',
            animationNum: 4,
        }])

        // 加速度
        this.gy = 10
        this.vy = 0
    }

    jump() {
        this.vy = -10
        this.rotation = -45
    }

    update() {
        super.update()
        if(this.alive) {
            // 重力
            this.y += this.vy
            this.vy += this.gy * 0.2
            if (this.y > 410) {
                this.y = 410
            }
            // 更新角度
            if (this.rotation < 45) {
                this.rotation += 5
            }
        }

    }

    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        // let names = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // let name = names[keyStatus]
        // this.changeAnimation(name)

    }

}