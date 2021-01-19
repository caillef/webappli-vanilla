const canvas = document.getElementById('canvasTest');
const ctx = canvas.getContext('2d');

// canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
// canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

function rect_create(x, y, w, h, color, dx, dy) {
    let obj = {
        x: x,
        y: y,
        w: w,
        h: h,
        color: color,
        dx: dx,
        dy: dy,
        draw: rect_draw
    }
    return obj
}

let rect = rect_create(10, 20, 30, 50, 'red', 3, 5)
let rect2 = rect_create(100, 20, 30, 50, 'green', 3, 5)

let gameobjects = [
    rect,
    // rect2
]

let frame = 0

const colors = ['blue', 'red', 'yellow']

function gameLoop() {
    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const obj of gameobjects)
        obj.draw()

    frame += 1
    if (frame % 30 == 0) {
        gameobjects.push(rect_create(30, 20, 100, 100, colors[Math.floor(Math.random() * colors.length)], 3, 8))
    }
}

function rect_draw() {
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.beginPath()
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath()

    if (!this.offset) this.offset = frame
    this.x = canvas.width / 2 + Math.cos(frame / 15 + this.offset) * (canvas.width / 10) * this.space
    this.y = canvas.height / 2 + Math.sin(frame / 15 + this.offset) * (canvas.height / 10) * this.space
    this.space = this.space == undefined ? 1 : (this.space + 0.01)
    // this.x += this.dx
    // this.y += this.dy
}

let gyroscope = new Gyroscope({
    frequency: 60
});

let gyroValue = {
    x: 0,
    y: 0,
    z: 0
}
gyroscope.addEventListener('reading', e => {
    gyroValue.x += gyroscope.x
    gyroValue.y += gyroscope.y
    gyroValue.z += gyroscope.z
    document.getElementById("gyro").innerHTML = Math.floor(gyroValue.x) + "<br>" + Math.floor(gyroValue.y) + "<br>" + Math.floor(gyroValue.z)
});
gyroscope.start();

let accelerometer = new Accelerometer({
    frequency: 60
});

accelerometer.addEventListener('reading', e => {
    document.getElementById("accele").innerHTML = Math.floor(accelerometer.x) + "<br>" + Math.floor(accelerometer.y) + "<br>" + Math.floor(accelerometer.z)
});
accelerometer.start();

// setInterval(gameLoop, 1000 / 60)