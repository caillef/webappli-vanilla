const canvas = document.getElementById('canvasTest');
const ctx = canvas.getContext('2d');

const colors = ['#ccd5ae', '#e9edc9', '#fefae0', '#faedcd', '#d4a373']

canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

const gameobjects = []

function init() {
    for (let i = 0; i < 0; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const r = Math.random() * 100 + 50
        const color = colors[Math.floor(Math.random() * colors.length)]
        gameobjects.push(circle_create(x, y, r, color, 3, 8))
    }
}

function circle_create(x, y, r, color, dx, dy) {
    let obj = {
        x: x,
        y: y,
        r: r,
        color: color,
        dx: dx,
        dy: dy,
        offset: Math.random() * Math.PI * 2
    }
    return obj
}

let frame = 0
function gameLoop() {
    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const obj of gameobjects)
        circle_draw(obj)
    frame += 1
}

function circle_draw(obj) {
    ctx.beginPath()
    ctx.fillStyle = obj.color;
    ctx.lineWidth = 10
    ctx.strokeStyle = 'black'
    ctx.arc(obj.x, obj.y, obj.r, obj.offset + frame / 30, obj.offset + Math.PI + frame / 30);
    ctx.stroke();
    ctx.fill();
    obj.x += Math.cos(frame/30) * 20
    obj.y += Math.sin(frame/30) * 7
    ctx.closePath()
}

function handleStart(evt) {
    for (const obj of gameobjects)
        obj.x += 10

    const touches = evt.changedTouches;
    for (var i = 0; i < touches.length; i++) {
        const x = touches[i].pageX
        const y = touches[i].pageY
        const r = 50
        const color = colors[Math.floor(Math.random() * colors.length)]
        gameobjects.push(circle_create(x, y, r, color))
    }
  }

init()
setInterval(gameLoop, 1000 / 60)



// let gyroscope = new Gyroscope({
//     frequency: 60
// });

// let gyroValue = {
//     x: 0,
//     y: 0,
//     z: 0
// }
// gyroscope.addEventListener('reading', e => {
//     gyroValue.x += gyroscope.x
//     gyroValue.y += gyroscope.y
//     gyroValue.z += gyroscope.z
//     document.getElementById("gyro").innerHTML = Math.floor(gyroValue.x) + "<br>" + Math.floor(gyroValue.y) + "<br>" + Math.floor(gyroValue.z)
// });
// gyroscope.start();

// let accelerometer = new Accelerometer({
//     frequency: 60
// });

// accelerometer.addEventListener('reading', e => {
//     document.getElementById("accele").innerHTML = Math.floor(accelerometer.x) + "<br>" + Math.floor(accelerometer.y) + "<br>" + Math.floor(accelerometer.z)
// });
// accelerometer.start();
