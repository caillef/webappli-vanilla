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
    rect2
]

let frame = 0

function gameLoop() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const obj of gameobjects)
        obj.draw()

    frame += 1
    if (frame % 60 == 0) {
        gameobjects.push(rect_create(30, 20, 100, 100, 'blue', 3, 8))
    }
}

function rect_draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    this.x += this.dx
    this.y += this.dy
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
    console.log("Angular velocity along the X-axis " + gyroscope.x);
    console.log("Angular velocity along the Y-axis " + gyroscope.y);
    console.log("Angular velocity along the Z-axis " + gyroscope.z);
    gyroValue.x += gyroscope.x
    gyroValue.y += gyroscope.y
    gyroValue.z += gyroscope.z
    document.getElementById("gyro").innerHTML = gyroValue.x + "<br>" + gyroValue.y + "<br>" + gyroValue.z
    gameLoop()
});
gyroscope.start();

// setInterval(gameLoop, 1000 / 60)