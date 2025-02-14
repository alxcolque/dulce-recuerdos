function completeStep(step) {
    if (step === 1) {
        const name = document.getElementById('nameInput').value;
        if (name.trim().toLowerCase() !== "dulce") {
            alert("¡Solo Dulce puede continuar!");
            return;
        }
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    } else if (step === 2) {
        const answer = document.querySelector('input[name="answerInput"]:checked').value;
        /* Si solo la respuesta "todo" se muestra el siguiente paso */
        console.log(answer);
        if (answer.trim().toLowerCase() === "todo") {
            document.getElementById('step2').style.display = 'none';
            document.getElementById('step3').style.display = 'block';
        } else {
            alert("Respuesta incorrecta. Inténtalo de nuevo.");
        }
    } else if (step === 3) {
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'block';
        
    } else if (step === 4) {
        const answer = document.getElementById('step4Input').value;
        if (answer.trim().toLowerCase() === "8") {
            document.getElementById('heartBtn').style.display = 'none';
            document.getElementById('description').style.display = 'none';
            document.getElementById('background-video').style.display = 'none';
            document.getElementById('step4').style.display = 'none';
            document.getElementById('memories').style.display = 'block';
            handleGalleryImages();
        } else {
            alert("Respuesta incorrecta. Inténtalo de nuevo.");
        }
    }
}
/* script para el wrapper */

// Thanks to @neave

var heartBtn = document.getElementsByClassName('heart')[0];
var TOTAL = 300;
var hearts = [];

var Heart = function() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.vx = 0;
	this.vy = 0;
	this.vz = 0;
	this.speed = 1;
	this.angle = 0;
	this.div = document.createElement('div');
	this.div.classList.add('hearts');
};

Heart.prototype.move = function() {
	this.x += this.vx * this.speed;
	this.y += this.vy * this.speed;
	this.z += this.vz * this.speed;
  this.div.style.transform = this.div.style.webkitTransform = this.getTransform();
};

Heart.prototype.setSize = function(width, height) {
	this.div.style.width = width + 'px';
	this.div.style.height = height + 'px';
};

Heart.prototype.getTransform = function() {
	return 'translate3d(' + this.x + 'px' + ',' + this.y + 'px,' + this.z + 'px) rotateZ(' + this.angle + 'deg)';
};

function addHeart(g) {
	document.body.appendChild(g.div);
	hearts.push(g);
}

function removeHearts() {
	for (var i = hearts.length; i--; ) {
		document.body.removeChild(hearts[i].div);
	}
	hearts = [];
}

function createHearts(total, x, y) {
	for (var i = total; i--; ) {
		var b = new Heart();
		b.x = x || window.innerWidth / 2;
		b.y = y || window.innerHeight / 2;
		var v = Math.random() * Math.PI * 2;
		b.vx = Math.cos(v);
		b.vy = Math.sin(v);
		b.vz = Math.random() * 4 - 2;
		var speed = Math.random() * 2 + 0.1;
		b.speed = speed * speed;
		b.angle = Math.random() * 360;
		b.setSize(Math.random() * 23 + 2, Math.random() * 13 + 2);
		addHeart(b);
	}
}

function update() {
	updateID = requestAnimationFrame(update);

	for (var i = hearts.length; i--; ) {
		hearts[i].move();
	}
}

function init(x, y) {
	removeHearts();
	createHearts(TOTAL, x, y);
}

heartBtn.addEventListener('click', function(event) {
  init(event.x, event.y);
});

// requestAnimationFrame shim
var i = 0,
    lastTime = 0,
    vendors = ['ms', 'moz', 'webkit', 'o'];

while (i < vendors.length && !window.requestAnimationFrame) {
  window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
  i++;
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 1000 / 60 - currTime + lastTime),
        id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}

setTimeout(function() {
  update();
	init();
}, 200);

function activeHearts() {
  console.log("activeHearts");
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  /* Restart the animation */
  removeHearts();
  createHearts(TOTAL, x, y);
  setTimeout(function() {
    update();
  }, 200);
}

function showMoreImages() {
  document.getElementById('moreImages').style.display = 'block';
}
function handleGalleryImages() {
  /* las imagenes estan en una carpeta llamada public/ScreenDul tienen nombre de 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 */
  let i = 1;
  let cad = '';
  for (let i = 1; i <= 10; i++) {
    cad += '<img loading="lazy" width="100%" height="100%" src="public/ScreenDul/' + i + '.png" alt="Recuerdo ' + i + '">';
  }
  document.getElementById('galleryItem').innerHTML = cad;
}