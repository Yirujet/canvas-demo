/**
 * 笛卡尔心形函数: f(x) = |x|^(2/3) + e/3*(pi - x^2)^(1/2)*sin(a*pi*x)
 * author: Aboli
 * warning: 不可转载，不可外泄，此动画只为阿颖设计
 */
const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
const w = window.innerWidth
const h = window.innerHeight
canvas.width = w
canvas.height = h
if (ctx) {
    const fn = (a, x) => Math.abs(x) ** (2 / 3) + Math.E / 3 * ((Math.PI - x ** 2 ) ** 0.5) * Math.sin(a * Math.PI * x)
    const colorList = ['#ff2400', '#ffb8c6', '#ff6080', '#ff0000', '#ffdfd4']
    class LoveCard {
        start = null
        static X_STEP = 0.01
        static INCREASE_A_STEP = 0.2
        static DECREASE_A_STEP = 0.1
        static MAX_A = 30
        static MIN_A = 10
        static MIN_X = Math.PI ** 0.5
        static DELAY = 20
        static MIN_SCALE = 2
        static MAX_SCALE = 20
        static HEART_COUNT = 10
        static MAX_LINE_WIDTH = 2
        
        constructor() {
            this.initHearts()
        }

        initHearts() {
            this.hearts = Array.from({ length: LoveCard.HEART_COUNT }).map(() => ({
                a: 0,
                increasing: true,
                pointX: 0,
                pointY: 0,
                scale: 0,
                maxA: 0,
                color: null,
                lineWidth: 0
            }))
        }

        createHeart() {
            const createHeart = timestamp => {
                if (this.start === null || (timestamp - this.start) > LoveCard.DELAY) {
                    this.start = timestamp
                    canvas.width = w
                    canvas.height = h
                    for (let i = 0, l = this.hearts.length; i < l; i++) {
                        if (this.hearts[i].a === 0) {
                            this.hearts[i].scale = LoveCard.MIN_SCALE + Math.random() * (LoveCard.MAX_SCALE - LoveCard.MIN_SCALE)
                            this.hearts[i].pointX = this.hearts[i].scale + Math.random() * (w - this.hearts[i].scale * 4)
                            this.hearts[i].pointY = this.hearts[i].scale + Math.random() * (h - this.hearts[i].scale * 2)
                            this.hearts[i].maxA = LoveCard.MIN_A + Math.random() * (LoveCard.MAX_A - LoveCard.MIN_A)
                            this.hearts[i].color = colorList[Math.floor(Math.random() * colorList.length)]
                            this.hearts[i].lineWidth = Math.random() * LoveCard.MAX_LINE_WIDTH
                        }
                        if (this.hearts[i].increasing) {
                            this.hearts[i].a += LoveCard.INCREASE_A_STEP
                        } else {
                            this.hearts[i].a -= LoveCard.DECREASE_A_STEP
                        }
                        if (this.hearts[i].a > this.hearts[i].maxA) {
                            this.hearts[i].increasing = false
                        }
                        if (this.hearts[i].a < 0) {
                            this.hearts[i].a = 0
                            this.hearts[i].increasing = true
                        }
                        ctx.beginPath()
                        for (let x = -LoveCard.MIN_X, y; x < LoveCard.MIN_X; x += LoveCard.X_STEP) {
                            y = fn(this.hearts[i].a, x)
                            if (x === -LoveCard.MIN_X) {
                                ctx.moveTo(x * this.hearts[i].scale + this.hearts[i].pointX, this.hearts[i].pointY - y * this.hearts[i].scale)
                            } else {
                                ctx.lineTo(x * this.hearts[i].scale + this.hearts[i].pointX, this.hearts[i].pointY - y * this.hearts[i].scale)
                            }
                        }
                        ctx.strokeStyle = this.hearts[i].color
                        ctx.lineWidth = this.hearts[i].lineWidth
                        ctx.lineCap = 'round'
                        ctx.lineJoin = 'round'
                        ctx.rotate(Math.PI / 2)
                        ctx.stroke()
                        ctx.closePath()
                    }
                }
                requestAnimationFrame(createHeart)
            }
            requestAnimationFrame(createHeart)
        }
    }

    const loveCard = new LoveCard()
    loveCard.createHeart()
}