const e = sel => document.querySelector(sel)
const es = sel => document.querySelectorAll(sel)

const log = console.log.bind(console)

// 加载图片
const imageFromPath = function (path) {
    let img = new Image()
    img.src = path
    return img
}

// 判断相撞的函数
const rectIntersects = function (a, b) {
    let aX = a.x + a.w / 2
    let aY = a.y + a.h / 2
    let bX = b.x + b.w / 2
    let bY = b.y + b.h / 2
    if (Math.abs(aX - bX) <= (a.w + b.w) / 2 && Math.abs(aY - bY) <= (a.h + b.h) / 2) {
        log('相撞了')
        return true
    }
    return false
}

// 随机取整数
const randomBetween = function(start, end) {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

