
import { Sprite } from './Sprite.js';

export const GameAssets = {

  sprites: {
    playerStanding: new Sprite("player_standing.png", {
      speed: 15,
      frames: 6,
      frameWidth: 105,
      frameHeight: 147,
      startAnimation: 0,
      currentIndex: 0,
      StopAnimation: 0
    }),

    overWorld: new Sprite("overworld.png", {
      speed: 0,
      frames: 0,
      frameWidth: 17600,
      frameHeight: 17600,
      startAnimation: 0,
      currentIndex: 0,
      StopAnimation: 0
    }),
    sword: new Sprite("sword.png", {
        speed: 0,
        frames: 0,
        frameWidth: 62,
        frameHeight: 243,
        startAnimation: 0,
        currentIndex: 0,
        StopAnimation: 0
    }),
    axe: new Sprite("axe.png", {
      speed: 0,
      frames: 0,
      frameWidth: 92,
      frameHeight: 184,
      startAnimation: 0,
      currentIndex: 0,
      StopAnimation: 0
    }),
    hammer: new Sprite("hammer.png", {
        speed: 0,
        frames: 0,
        frameWidth: 468,
        frameHeight: 900,
        startAnimation: 0,
        currentIndex: 0,
        StopAnimation: 0
    })
  },

 PlayerClasses: {
  warrior: {
    name:'warrior',
    movementSpeed: 7,
    dashSpeed: 12,
    attackSpeed: 1,   // attacks per second, or cooldown
  },
  rogue: {
    name:'rogue',
    movementSpeed: 11,
    dashSpeed: 15,
    attackSpeed: 1.5,
  },
  mage: {
    name:'mage',
    movementSpeed: 5,
    dashSpeed: 10,
    attackSpeed: 2,
  }
 },

Weapons: {
  sword: {
    name: "sword",
    type: "melee",
    damage: 25,
    attackSpeed: .1,      // 1 attack per second
    range: 40,           // pixels around player
    swingArc: Math.PI/3, // 60 degree swing arc
  },
  hammer: {
    name: "hammer",
    type: "melee",
    damage: 15,
    attackSpeed: 2,      // faster attacks
    range: 30,
    swingArc: Math.PI/4, // 45 degree swing arc
  },
  axe: {
    name: "axe",
    type: "melee",
    damage: 40,
    attackSpeed: 0.7,    // slower
    range: 45,
    swingArc: Math.PI/2, // wide 90 degree swing
  },
  bow: {
    name: "bow",
    type: "ranged",
    damage: 20,
    attackSpeed: 1.2,
    range: 300,
    projectileSpeed: 12, // arrow flight speed
  },
  staff: {
    name: "staff",
    type: "ranged",
    damage: 18,
    attackSpeed: 1.5,
    range: 250,
    projectileSpeed: 10,
  }
},
  mouse: {
    x: 0,
    y: 0,
    cameraX:0,
    cameraY:0,
    devicePixelRation:1
  }
  // add more classes as needed
}


export function loadAssets(){
  console.log("Loading Game Assets")
  for(const id in GameAssets.sprites){
    GameAssets.sprites[id].loadImage()
  }

}