



import { Player } from '../shared/js/classes/Player.js'; // ✅ relative path
import { Camera } from './Camera.js'; // ✅ relative path
import { Sprite } from '../shared/js/classes/Sprite.js'; // ✅ relative path

import { GameAssets, loadAssets} from '../shared/js/classes/GameAssets.js';


let MAP_WIDTH = 1000
let MAP_HEIGHT = 1000

let current_map

export class Game{

constructor(canvasWidth,canvasHeight){

    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.camera = new Camera(this.canvasWidth,this.canvasHeight,MAP_WIDTH,MAP_HEIGHT)
    this.session_ID = 0
    this.hasInit = false
    this.players = {}
}

init(){
    if(!this.hasInit){
        loadAssets()
        this.camera.follow = this.players[this.session_ID]
        this.hasInit = true
    }
}

tick(){
    
    for(const id in this.players)
        this.players[id].tick(this)
    


    if(this.camera.follow){
        this.camera.tick()
    }

}

draw(c){
    c.save()
    c.translate(-this.camera.x,-this.camera.y)
    
    if(current_map){
        c.drawImage(current_map.image,0,0)
    }

    for(const playersID in this.players){
        this.players[playersID].draw(c)
    }

    c.restore()

}




handleKeys(keys,socket){
    //player movement
    if(keys.w)
        this.players[socket.id].y -= this.players[socket.id].player_class.movementSpeed
    if(keys.a)
       this.players[socket.id].x -= this.players[socket.id].player_class.movementSpeed
    if(keys.s)
        this.players[socket.id].y += this.players[socket.id].player_class.movementSpeed
    if(keys.d)
        this.players[socket.id].x += this.players[socket.id].player_class.movementSpeed

    socket.emit('handleKeys',keys)
}


updatePlayers(playerDataRaw){
    
    for(const id in playerDataRaw){
        const playerData = playerDataRaw[id]

        //if backend player doesnt exist in front end player
        if(!this.players[playerData.ID]){
            this.players[playerData.ID] = new Player({
            ID:playerData.ID,
            x:playerData.x, 
            y:playerData.y,
            username:playerData.username,
            w:playerData.w,
            h:playerData.h,
            player_class:GameAssets.PlayerClasses[playerData.player_class],
            spriteName:playerData.spriteName
            })
            console.log("Create New Player")
            this.players[id].setSprite()
            this.players[id].equip(playerData.weapon)
            this.players[id].weapon.setSprite()
        }else{
            this.players[id].username = playerData.username
            this.players[id].x = playerData.x
            this.players[id].y = playerData.y
            this.players[id].w = playerData.w
            this.players[id].h = playerData.h
            
            if(!this.players[id].spriteName === playerData.spriteName){
                this.players[id].spriteName = playerData.spriteName
                this.players[id].setSprite()
            }
            console.log(playerData.weapon)
            console.log(this.players[id].weapon.name)
            if(!(this.players[id].weapon.type.name === playerData.weapon)){
                console.log("weapon mismatch, reequip")
                this.players[id].equip(playerData.weapon)
                this.players[id].weapon.setSprite()
            }

        }

    }
    
    
    for (const localID in this.players) {
        if (!playerDataRaw[localID]) {
            delete this.players[localID];
        }
    }

    this.camera.follow = this.players[this.session_ID]

}

//download new weapon data into client
updateWeapons(weaponDataRaw){
    console.log("updateWeapons")
    for(const id in weaponDataRaw){
        
        const serverWeapon = weaponDataRaw[id]
        
        if(!this.players[id].weapon){
            return
        }else{
            this.players[id].weapon.x = serverWeapon.x
            this.players[id].weapon.y = serverWeapon.y
            this.players[id].weapon.angle = serverWeapon.angle
            this.players[id].weapon.swinging = serverWeapon.swinging
            this.players[id].weapon.type = GameAssets.Weapons[serverWeapon.name]
        }

    }



}

//export weapon data
handleMouse(mouse,socket){
    //player movement

    const weaponData = this.players[this.session_ID].weapon.export()
    socket.emit('updateWeapons',weaponData)
}

//take world data and put it into the game
selectWorld(world_settings){
    console.log(world_settings)
    MAP_WIDTH = world_settings.width
    MAP_HEIGHT = world_settings.height

    current_map = new Sprite(world_settings.name,{frameWidth: MAP_WIDTH, frameHeight: MAP_HEIGHT})
    current_map.loadImage()

    this.camera.GameHeight = MAP_HEIGHT
    this.camera.GameWidth = MAP_WIDTH
    this.camera.xMax = MAP_WIDTH - this.camera.ScreenWidth
    this.camera.yMax = MAP_HEIGHT - this.camera.ScreenHeight

}

}
