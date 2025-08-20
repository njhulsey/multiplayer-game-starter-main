



import { Player } from './shared/js/classes/Player.js'; // ✅ relative path
import { GameAssets, loadAssets} from './shared/js/classes/GameAssets.js';

const MAP_WIDTH = 12000
const MAP_Heigth = 12000


export class Game{

constructor(){
    this.players = {}
    this.currentMap = {}

}

tick(){


}


///GAME ACTING AS SERVER. SEND ALL SERVER THINGS. 
//UPDATE GAME STATE HERE
emit(io){

    //update the state of game 

    const playersPacketData =  {}
    const weaponsPacketData =  {}
    //broad cast user data as server
    for(const i in this.players){
        playersPacketData[this.players[i].ID] = this.players[i].export()
    }
    io.emit('updatePlayers',playersPacketData)
    
    for(const i in this.players){
        weaponsPacketData[this.players[i].ID] = this.players[i].weapon.export()
    }
    // console.log("weapon data sending out")
    // console.log(weaponsPacketData)
    io.emit('updateWeapons',weaponsPacketData)


}


handleKeys(socket,keys){

    //player movement
    if(keys.w)
        this.players[socket.id].y -= this.players[socket.id].player_class.movementSpeed
    if(keys.a)
       this.players[socket.id].x -= this.players[socket.id].player_class.movementSpeed
    if(keys.s)
        this.players[socket.id].y += this.players[socket.id].player_class.movementSpeed
    if(keys.d)
        this.players[socket.id].x += this.players[socket.id].player_class.movementSpeed

}

//this update socket 
updateWeapons(socket,weaponData){
    if(!(this.players[socket.id].weapon.type.name == weaponData.name)){
        console.log("Changing weapon")
        this.players[socket.id].equip(weaponData.name)
    }

    this.players[socket.id].weapon.x = weaponData.x
    this.players[socket.id].weapon.y = weaponData.y
    this.players[socket.id].weapon.angle = weaponData.angle
    this.players[socket.id].weapon.swinging = weaponData.swinging

}



createPlayer(socket){
    console.log("createPlayer")
    this.players[socket.id] = new Player({
        ID:socket.id,
        x:Math.random()*500,
        y:Math.random()*500,
        username:"",
        w:105,
        h:147,
        player_class: GameAssets.PlayerClasses['warrior'],
        spriteName:'player_standing.png'
      })
      
      this.players[socket.id].equip('sword')
      console.log("Done Create Player")
}

destroyPlayer(socket){
    console.log("destroy Player")
    delete this.players[socket.id]
}



//broadcast to new socket connection what the world is like
selectWorld(socket){
    console.log("selectWorld")
    console.log(this.currentMap)
    socket.emit("selectWorld",this.currentMap)
    
}

enterGame(socket,data){
    console.log("enter Game")

    this.players[socket.id].player_class= GameAssets.PlayerClasses[data.player_class]
    this.players[socket.id].equip(data.weapon)
    this.players[socket.id].username = data.username
}


}