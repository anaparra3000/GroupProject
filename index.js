const canvas = document.querySelector('canvas')
const worldImg = new Image()
worldImg.src = `./images/bezos-background.jpg`

// canvas.width = window.innerWidth;
// canvas.height = canvas.width * worldImg.height / worldImg.width
canvas.width = window.innerWidth;
canvas.height = 540
// console.log(canvas.height)
const ctx = canvas.getContext('2d')

let world = {
  x: 0,
  y: 0,
  w: canvas.width,
  h: canvas.height
}



worldImg.onload = function () {
  ctx.drawImage(worldImg, world.x, world.y, world.w, world.h)
}

function drawHealthBar() {
  ctx.fillStyle = "green"
  ctx.fillRect(50, 100, 200, 20)
  ctx.fillStyle = "black"
  ctx.font = 'bold 20px serif';
  ctx.fillText("Health!", 50, 100);
}


const BezosImg = new Image()
BezosImg.src = `./images/bezos-bot-v2.png`

class bot {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.lasers = []
  }
  shootCannon = () => {
    console.log('shoot')
    //Make a new beam when we shoot 
    let beam = {
      x: this.x + (this.w / 2), y: this.y, w: 10, h: 20
    }
    //Push to our laser array
    this.lasers.push(beam)
  }
}

function drawLasers() {
  for (let beam of bot.lasers) {
    beam.y -= 10
    ctx.fillStyle = 'silver'
    ctx.fillRect(beam.x, beam.y, beam.w, beam.h)
  }
}

let Bezos = new bot(0, 340, 250, 175)

// obstacles

let muskImg = new Image()
muskImg.src = "./images/musk.png"

let musk = []

let zuckImg = new Image()
zuckImg.src = "./images/zuck.png"


class Obstacles {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  drawObstacles() {
    this.x--
    ctx.drawImage(muskImg, this.x, this.y, this.w, this.h)
    ctx.drawImage(zuckImg, this.x - 100, this.y + 75, this.w, this.h)
  }

}

setInterval(function () {
  let newObs = new Obstacles(1000, 300, muskImg.width * .45, muskImg.height * .45)
  musk.push(newObs)
}, 10000)

function drawMusk() {
  for (let elon of musk) {
    elon.drawObstacles()
  }
}

function drawZuck() {
  for (let mark of zuck) {
    mark.drawObstacles()
  }
}
//

window.onkeydown = function (event) {
  switch (event.key) {
    case 'ArrowLeft':
      Bezos.x -= 15
      break;
    case 'ArrowRight':
      Bezos.x += 15
      break;
  }
}


// health bar 

// class progressBar {
//   constructor(element, initialValue = 0) {
//     this.valueElem = elements.querySelector('.progress-bar-value');
//     this.fillElem = elements.querySelector('.progress-bar-fill');

//     this.setValue(initialValue);
//   }

//   setValue(newValue) {
//     if (newValue < 0) {
//       newValue = 0;
//     }
//     if (newValue > 100) {
//       newValue = 100;
//     }
//     this.value = newValue;
//     this.update();

//   }

//   update() {
//     const percentage = this.value + '%';

//     this.fillElem.style.width = percentage;
//     this.valueElem.textContent = percentage;
//   }

// }
// //  for some reason the code below breaks the bezos character
// new progressBar(document.querySelector('.progress-bar'));






animationId = null;

function animate() {
  animationId = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(worldImg, world.x, world.y, world.w, world.h)
  ctx.drawImage(BezosImg, Bezos.x, Bezos.y, Bezos.w, Bezos.h)
  drawMusk()
  drawHealthBar()
}
animate()



