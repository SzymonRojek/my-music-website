let width = null;
let height = null;
let ctx = null;
let target = null;
let animateHeader = true;
let circles = null;

// Main
initHeader();
addListeners();

function initHeader() {
  width = window.innerWidth;
  height = window.innerHeight;
  target = { x: 0, y: height };

  const largeHeader = document.querySelector(".animation-drops");
  largeHeader.style.height = height + "px";

  const canvas = document.getElementById("demo-canvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");

  // create particles
  circles = [];

  for (let x = 0; x < width * 0.5; x++) {
    let c = new Circle();

    circles.push(c);
  }
  animate();
}

// Event handling
function addListeners() {
  window.addEventListener("scroll", scrollCheck);
  window.addEventListener("resize", resize);
}

function scrollCheck() {
  if (document.body.scrollTop > height) {
    animateHeader = false;
  } else {
    animateHeader = true;
  }
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  largeHeader.style.height = height + "px";
  canvas.width = width;
  canvas.height = height;
}

function animate() {
  if (animateHeader) {
    ctx.clearRect(0, 0, width, height);

    for (let i in circles) {
      circles[i].draw();
    }
  }

  requestAnimationFrame(animate);
}

// Canvas manipulation
function Circle() {
  const _this = this;

  // constructor
  (function () {
    _this.pos = {};
    init();
    // console.log(_this);
  })();

  function init() {
    const width = window.innerWidth;

    _this.pos.x = Math.random() * width;
    _this.pos.y = height + Math.random() * 100;
    _this.alpha = 0.1 + Math.random() * 0.3;
    _this.scale = 0.1 + Math.random() * 0.3;
    _this.velocity = Math.random();
  }

  this.draw = function () {
    if (_this.alpha <= 0) {
      init();
    }
    _this.pos.y -= _this.velocity;
    _this.alpha -= 0.0005;
    ctx.beginPath();
    ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(255,255,255," + _this.alpha + ")";
    ctx.fill();
  };
}
