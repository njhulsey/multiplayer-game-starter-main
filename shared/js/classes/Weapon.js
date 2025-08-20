


import { GameAssets } from './GameAssets.js';



export class Weapon {



  constructor(weapon) {
    this.x = 0;           
    this.y = 0;
    this.angle = 0;             // current rotation (radians)
    this.baseOffset = Math.PI / 2; // keep sword upright by default
    this.swinging = false;      // swing state
    this.currentSprite = null
    this.type = GameAssets.Weapons[weapon]
    this.swingProgress = 0;     // 0–1 progress of swing
  }

  //we have to load sprites separatly outside of the server. setSprite code only called 
  setSprite(){
    console.log("weapon setSprite")
    switch(this.type.name){
      case "sword":
          this.currentSprite = GameAssets.sprites.sword
      break;
      case "axe":
          this.currentSprite = GameAssets.sprites.axe
      break;
            case "hammer":
          this.currentSprite = GameAssets.sprites.hammer
      break;

    }

  }


  // tick(owner) {
  //   if(this.type){
  //     // Weapon follows player center (world coordinates)
  //     this.x = owner.x + (owner.w / 2);
  //     this.y = owner.y + (owner.h / 2) + 50;

  //     // Convert mouse to world coordinates
  //     const mouseWorldX = GameAssets.mouse.x + GameAssets.mouse.cameraX;
  //     const mouseWorldY = GameAssets.mouse.y +  GameAssets.mouse.cameraY;


  //     const dx = mouseWorldX - this.x;
  //     const dy = mouseWorldY - this.y;
  //     let targetAngle = Math.atan2(dy, dx) + this.baseOffset;

  //     // Compute smallest angle difference
  //       let delta = targetAngle - this.angle;
  //       while (delta > Math.PI) delta -= 2 * Math.PI;
  //       while (delta < -Math.PI) delta += 2 * Math.PI;

  //   // Smooth rotation
  //   this.angle += delta * 0.5;
  //     // Handle swing if active

  
  // }
//}

tick(owner) {
  if (!this.type) return;

  // --- Base: Weapon follows player bottom-center ---
  const playerBottomX = owner.x + (owner.w / 2) - 20;
  const playerBottomY = owner.y + owner.h - 40; // bottom center

  // --- Hover offset: small circle around player (20px) ---
  const mouseScreenX = GameAssets.mouse.x - window.innerWidth / 2;
  const mouseScreenY = GameAssets.mouse.y - window.innerHeight / 2;

  const hoverRadius = 50;
  const hoverX = (mouseScreenX / (window.innerWidth / 2)) * hoverRadius;
  const hoverY = (mouseScreenY / (window.innerHeight / 2)) * hoverRadius;

  this.x = playerBottomX + hoverX;
  this.y = playerBottomY + hoverY;

  // --- Rotation toward mouse ---
  const mouseWorldX = GameAssets.mouse.x + GameAssets.mouse.cameraX;
  const mouseWorldY = GameAssets.mouse.y + GameAssets.mouse.cameraY;

  const dx = mouseWorldX - this.x;
  const dy = mouseWorldY - this.y;
  let targetAngle = Math.atan2(dy, dx) + this.baseOffset;

  // Smooth angle difference
  let delta = targetAngle - this.angle;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;

  if (Math.abs(delta) > Math.PI / 2) {
    this.angle = targetAngle;
    this.angularVelocity = 0;
  } else {
    const stiffness = 0.5;
    const damping = 0.3;
    this.angularVelocity = this.angularVelocity || 0;
    this.angularVelocity += delta * stiffness;
    this.angularVelocity *= damping;
    this.angle += this.angularVelocity;
  }

  // --- Handle swing if active ---
  if (this.swinging) {
    this.swingProgress += 0.15;
    if (this.swingProgress >= 1) {
      this.swinging = false;
      this.swingProgress = 0;
    }
  }
}


  tickSwing(){
      if (this.swinging) {
        this.swingProgress += this.type.attackSpeed; // swing speed
        if (this.swingProgress >= 15) {
          this.swinging = false;
          this.swingProgress = 0;
        }
      }
    }
  

  attack() {
    if (!this.swinging) {
      this.swinging = true;
      this.swingProgress = 0;
    }
  }

draw(c) {
  if (!this.currentSprite || !this.currentSprite.image.complete) return;

  c.fillRect(GameAssets.mouse.x + GameAssets.mouse.cameraX ,GameAssets.mouse.y +  GameAssets.mouse.cameraY,20,20)
  
  c.save();
  c.translate(this.x, this.y);
  let drawAngle = this.angle;
  if (this.swinging) drawAngle += Math.sin(this.swingProgress * Math.PI) * 0.5;
  c.rotate(drawAngle);

const gripOffset = 20; // pixels from bottom
const w = this.currentSprite.width / 2;
const h = this.currentSprite.height - gripOffset;
c.drawImage(this.currentSprite.image, -w, -h);

  c.restore();
}


export(ID){
    return {
      x : this.x,
      y : this.y,
      angle: this.angle,
      swinging: this.swinging = false,      // swing state
      name:this.type.name
    }

  }
}
