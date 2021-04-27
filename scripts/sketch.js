var fireworks = [];
var gravity;
var img
var congratulation

function preload() {
    img = loadImage('imgs/logo.png')
}

function setup() {
    createCanvas(windowWidth,windowHeight)
    congratulation = new Congratulation(img)
    gravity = createVector(0, 0.2);
    background(255,255,255);
}

function draw() {
    background(255, 255, 255, 50);

    congratulation.show()

    //Ilutulestik hakkab pihta, kui õnnitlus hakkab nähtavale tulema
    if (congratulation.logoStarted) {
        if (random(1) < 0.15) { //Et ilutulestikku ei tuleks liiga palju korraga
            fireworks.push(new Firework());
        }
    }
        for (var i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].show();
            if (fireworks[i].done()) {
                fireworks.splice(i, 1);
            }
        }
}

function mousePressed() {
    fireworks.push(new ClickFirework())
}

class ClickFirework extends Firework{

    constructor(fixed) {
        super(fixed);
        this.exploded = true
        this.explode()
    }

    explode() {
        for (var i = 0; i < 100; i++) {
            var p = new Particle(mouseX, mouseY, this.randomColor, false)
            this.particles.push(p);
        }
    }

}