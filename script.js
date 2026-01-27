// script.js

// Hart messages data
const heartData = [
    { emoji: "", mensaje: "U R CUTE" },
    { emoji: "", mensaje: "I LOVE U" },
    { emoji: "", mensaje: "BE MINE" },
    { emoji: "", mensaje: "MY LOVE" },
    { emoji: "", mensaje: "SO HOT" },
    { emoji: "", mensaje: "UR MINE" },
    { emoji: "", mensaje: "4EVER" },
    { emoji: "", mensaje: "KISS ME" },
    { emoji: "", mensaje: "MUCH LOVE" }
];

// click event on the button
document.getElementById('btn-button').addEventListener('click', () => releaseHearts(1));

// Falling hearts function
function releaseHearts(count = 1) {
    const container = document.querySelector('.container');
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const randomHeart = heartData[Math.floor(Math.random() * heartData.length)];
            const el = document.createElement('div');
            el.className = 'mini-heart';

            // Random color variant
            const variants = ['rojo', 'rosa', 'naranja', 'morado'];
            el.classList.add(variants[Math.floor(Math.random() * variants.length)]);

            const contenido = document.createElement('div');
            contenido.className = 'contenido';
            contenido.textContent = randomHeart.mensaje;

            el.appendChild(contenido);
            container.appendChild(el);

            setTimeout(() => {
                if (el.parentNode) el.remove();
            }, 4200);
        }, i * 140);
    }
    playSonidoMaquina();
}

// Sound effect function
function playSonidoMaquina() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.12);
    } catch (e) {
        // In case audio is not supported
        console.warn('Audio not available', e);
    }
}

// glitteringSea.js
/*
* File Name / glitteringSea.js
* Created Date / Aug 14, 2020
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

(function () {
  'use strict';
  window.addEventListener('load', function () {
    var canvas = document.getElementById('canvas');

    if (!canvas || !canvas.getContext) {
      return false;
    }

    /********************
      Random Number
    ********************/

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    /********************
      Var
    ********************/

    var ctx = canvas.getContext('2d');
    var X = canvas.width = window.innerWidth;
    var Y = canvas.height = window.innerHeight;
    var mouseX = null;
    var mouseY = null;
    var shapeNum = 300;
    var shapes = [];
    var style = {
      black: 'black',
      white: 'white',
      lineWidth: 4,
    };

    /********************
      Animation
    ********************/

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(cb) {
        setTimeout(cb, 17);
      };

    /********************
      Shape
    ********************/
     
    function Shape(ctx, x, y) {
      this.ctx = ctx;
      this.init(x, y);
    }
    
    Shape.prototype.init = function(x, y) {
      this.x = x;
      this.y = y;
      this.r = rand(10, 25);
      this.ga = Math.random() * Math.random() * Math.random() * Math.random();
      this.v = {
        x: Math.random(),
        y: -1
      };
      this.l = rand(0, 20);
      this.sl = this.l;
    };

    Shape.prototype.updateParams = function() {
      var ratio = this.l / this.sl;
      //this.r *= ratio;
      this.l -= 1;
      if (this.l < 0) {
        this.init(X * (Math.random() + Math.random()) / 2, rand(0, Y));
      }
    };

    Shape.prototype.updatePosition = function() {
      this.x += Math.random();
      this.y += -Math.random();
    };
    
    Shape.prototype.draw = function() {
      var ctx  = this.ctx;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = this.ga;
      //ctx.fillStyle = 'rgb(123, 252, 100)';
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };

    Shape.prototype.render = function(i) {
      this.updatePosition();
      this.updateParams();
      this.draw();
    };

    for (var i = 0; i < shapeNum; i++) {
      var s = new Shape(ctx, X * (Math.random() + Math.random()) / 2, rand(0, Y));
      shapes.push(s);
    }

    /********************
      Render
    ********************/
    
    function render() {
      ctx.clearRect(0, 0, X, Y);
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].render(i);
      }
      requestAnimationFrame(render);
    }

    render();

    /********************
      Event
    ********************/
    
    function onResize() {
      X = canvas.width = window.innerWidth;
      Y = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', function() {
      onResize();
    });

    window.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, false);

  });
})();
