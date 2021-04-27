class Particle {

    constructor(x, y, color, notExploded, fixed) {
        this.pos = createVector(x, y);
        this.notExploded = notExploded
        this.lifespan = 200; //Arv, mis iseloomustab, kui kaua ilutulestik on veel elus pärast plahvatust
        this.color = color;
        this.fixed = fixed; //Fixed - kas antud ilutulestik on seotud logo välja plahvatamisega või mitte

        //Leitakse suvaliselt arvud kiiruse jaoks, mis tähistavad, mis suunas ja kui kõrgele ilutulestik lendab
        //Velocity - kiirus: iseloomustab läbitud pikkust ajaühikus
        if (this.notExploded) {
            //Jääb iga ekraanisuuruses enam-vähem kena ilutulestik. Miski ei tohiks ekraanist välja lennata ja ilutulestik võib kenasti igale poole tekkida
            if (!this.fixed) {
                this.vel = createVector(random(width * (-0.005), width * 0.005), random(height * (-0.02), -8))
            } else {
                this.vel = createVector(0, height * (-0.02))
            }
        } else {
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(2, 10)) //
        }
        this.acc = createVector(0, 0);

    }

        //Et ilutulestik mõjuks usutavamalt, on sellele rakendatud gravitatsioon
        applyForce(force) {
            this.acc.add(force);
        }

        update() {
            if (!this.notExploded) {
                this.vel.mult(0.90);
                this.lifespan -= 4;
            }
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0); //Et kiirus ei suureneks, vaid oleks konstantne
        }

        done() {
            if (this.lifespan < 0) {
                return true;
            } else {
                return false;
            }
        }

        show() {
            if (!this.notExploded) {
                strokeWeight(4);
                stroke(this.color)
            } else {
                strokeWeight(6)
                stroke(this.color)
            }
            point(this.pos.x, this.pos.y);
        }

}