class Firework {

    constructor(fixed) {

        //#ff452d - punane
        //#ffc400 - kollane
        //##00bf9c - roheline-sinine

        this.colors = ['#ff452d', '#ffc400', '#00bf9c'] //Värvid, mis jäid play.ee -s silma
        this.randomColor = this.colors[Math.floor(Math.random() * this.colors.length)]
        this.fixed = fixed //Fixed tähendab seda, et kas antud ilutulestik on seotud õnnitluse välja tulemisega või mitte.
        if (this.fixed) {
            this.firework = new Particle(width / 2, height, this.randomColor, true, true);
        } else {
            this.firework = new Particle(width / 2, height, this.randomColor, true);
        }

        this.exploded = false;
        this.particles = []

    }

    done() {
        if (this.exploded && this.particles.length === 0) {
            return true;
        }
        return false;
    }


    update() {
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();
            if (this.firework.vel.y >= 0 || (this.fixed && this.firework.pos.y <= Math.round(height/6))) {
                this.exploded = true;
                this.explode();
            }
        }
        for (var i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    }

    explode() {
        for (var i = 0; i < 100; i++) {
            var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.randomColor, false)
            this.particles.push(p);
        }
    }


    show() {
        if (!this.exploded) {
            this.firework.show();
        }
        for (var i=0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    }

}

