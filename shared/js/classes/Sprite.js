

export class Sprite{

    
    constructor(imageName,animation){
        this.animation = animation
        this.image
        console.log(animation)
        this.width = 0 //of entire image
        this.height = 0//of entire image
        this.imageName = imageName
        this.frameCount = 0
        
    } 


    loadImage(){
        console.log("loading")
        console.log(this.imageName)
        this.image = new Image()
        this.image.src = ('./assets/' + this.imageName)
        
        this.image.onload = () => {
            this.width = this.image.width;
             this.height = this.image.height;
        console.log(`Loaded ${this.imageName}: ${this.width}x${this.height}`);
    }
    }

    playAnimation(){


        if(this.animation.startAnimation){

            this.frameCount ++
            if(this.frameCount == this.animation.speed){
                this.frameCount = 0
                this.animation.currentIndex += 1

                if(this.animation.currentIndex == this.animation.frames-1){
                    this.animation.startAnimation = 0
                    this.animation.currentIndex = 0
                }

            }
        }




    }

    drawCurrentSprite(c,position){
        if (!this.image.complete) return;
        c.drawImage(this.image,
            (this.animation.currentIndex * this.animation.frameWidth),
            0,
            this.animation.frameWidth,
            this.animation.frameHeight,
            position.x,
            position.y,
            this.animation.frameWidth,
            this.animation.frameHeight
        )
        
    }

}