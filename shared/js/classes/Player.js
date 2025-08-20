
import { GameAssets } from './GameAssets.js';
import { Weapon } from './Weapon.js'; // ✅ relative path


export class Player {
  constructor({ID, x, y, w,h,username, player_class,spriteName}) {
    this.ID = ID
    this.username = username
    this.x = x
    this.y = y
    this.w = w //for hitboxes, not sprites
    this.h = h //for hitboxes, not sprites
    this.weapon = null
    this.currentSprite = null
    this.player_class = player_class
    this.spriteName = spriteName
  }

//client tick()
  tick(game){


    this.currentSprite.animation.startAnimation = true
    this.currentSprite.playAnimation()

    if(game.session_ID == this.ID){
      this.weapon.tick(this)
      this.weapon.swinging = true
      this.weapon.tickSwing()
    }
  }

  setSprite(){

    switch(this.spriteName){

      case "player_standing.png":
          this.currentSprite = GameAssets.sprites.playerStanding
      break;

    }


  }

  draw(c) {
    c.beginPath()
    this.currentSprite.drawCurrentSprite(c,{x:this.x,y:this.y})
    c.fillText(this.username,this.x + this.w/2,this.y + this.h + 30)

    if(this.weapon) this.weapon.draw(c)
  
  }

  equip(weapon){
    if(weapon)
      this.weapon = new Weapon(weapon)
    
  }


  export(){
    return {
      ID:this.ID,
      x : this.x,
      y : this.y,
      username:this.username,
      w: this.w,
      h: this.h,
      weapon: this.weapon.type.name,
      player_class: this.player_class.name,
      spriteName:this.spriteName
    }


  }

}


