
import { GameAssets } from '../shared/js/classes/GameAssets.js';

export class Camera {
    

    constructor(ScreenWidth, ScreenHeight, GameWidth,GameHeight){

        this.ScreenWidth=ScreenWidth;
        this.ScreenHeight=ScreenHeight;
        this.GameWidth=GameWidth;
        this.GameHeight=GameHeight;

        this.x=0;
        this.y=0;
        this.xMax = this.GameWidth;
        this.xMin = 0;
        this.yMax = this.GameHeight;
        this.yMin = 0;
        this.follow;
        
    }

    
 tick() {



  // Calculate the target camera position
  const playerCenterX = this.follow.x + this.follow.w;
  const playerCenterY = this.follow.y + this.follow.h;

  // Mouse offset relative to screen center
  const mouseOffsetX = (GameAssets.mouse.x - this.ScreenWidth / 2) * 0.35; // bias factor
  const mouseOffsetY = (GameAssets.mouse.y - this.ScreenHeight / 2) * 0.35;

  // Target camera position
  const targetX = playerCenterX - this.ScreenWidth / 2 + mouseOffsetX;
  const targetY = playerCenterY - this.ScreenHeight / 2 + mouseOffsetY;

  // Smoothly move the camera toward the target
  const smoothFactor = 0.1; // smaller = smoother
  this.x += (targetX - this.x) * smoothFactor;
  this.y += (targetY - this.y) * smoothFactor;

  // Clamp to world bounds
  this.x = Math.max(this.xMin, Math.min(this.xMax, this.x));
  this.y = Math.max(this.yMin, Math.min(this.yMax, this.y));
    
  }

    
setFollow(follow) {
      this.follow = follow;
    }
  }