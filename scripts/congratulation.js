class Congratulation {

    constructor(logo) {
        this.logo = logo;
        //Et oleks effekt, et logo tuli plahvatusest
        this.width = logo.width / 25;
        this.height = logo.height / 25;
        this.particle = new Firework(true)

        //Logo võiks olla üleval pool keskel
        this.targetPosX = Math.round(width / 2)
        this.targetPosY = Math.round(height / 6)

        this.logoStarted = false

    }
    show() {
        //Ilutulestiku elutsükkel
        if (this.particle !== null) {
            this.particle.update()
            this.particle.show()
            if (this.particle.exploded) {
                this.logoStarted = true
            }
            if (this.particle.done()) {
                this.particle = null;
            }
        }
        //Kui ilutulestik on jõudnud plahvatada
        if (this.logoStarted) {
            //Logo suureneb ajaga
            if (this.width<300) {
                this.height *= 1.05
                this.width *= 1.05
            }
            //Kui logo on saavutanud lõppsuuruse, tuleb ka õnnitlustekst
            if (this.width >= 300){
                this.congratulationText()
            }
            imageMode(CENTER);
            image(this.logo, this.targetPosX, this.targetPosY, this.width, this.height)
        }
    }

    congratulationText() {
        //Ääris on värviline, sest particle juures on antud käsk stroke(). Värv sõltub sellest, mis värvi
        //oskasega viimati tööd tehti
        rectMode(CENTER)
        fill(50,10)
        rect(width/2, height/2, width*0.8, 100, 20)
        fill(0,100)
        textAlign(CENTER, CENTER);
        textSize(width*0.020)
        textFont('Chevin W01')
        text("🎈🎉 10 aastat pole nalja asi. Palju õnne ja jaksu ka edasistes projektides! 🎉🎈", width/2,height/2)
    }

}