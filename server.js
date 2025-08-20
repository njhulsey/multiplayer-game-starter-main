
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Game } from './gameServer.js'; // shared logi

const app = express();
const server = http.createServer(app);
const io = new Server(server, { pingInterval: 17, pingTimeout: 2000 });

const port = 3000;

app.use(express.static('public'));      // serves /index.html, /client.js, etc.
app.use('/shared', express.static('shared'));

// create game instance
const game = new Game();

function startGame() {

  game.currentMap = {
    width:17600,
    height:17600,
    name:'overworld.png'
  }

}




//GLOGBAL TICK
setInterval(()=>{
  
  game.tick()
  game.emit(io)


},15)



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  console.log('sending index.htm')
})


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



io.on('connection', (socket) => {
  console.log('a user connected');

  game.selectWorld(socket)
  game.createPlayer(socket)

   
  socket.on('disconnect',(reason) =>{
    game.destroyPlayer(socket)

  })


  socket.on('handleKeys',(keys) =>{
    game.handleKeys(socket,keys)

  })

  socket.on('updateWeapons',(weaponData) =>{
    game.updateWeapons(socket,weaponData)

  })

  socket.on('enterGame',(data) =>{

    game.enterGame(socket,data) 

  })

})


startGame();