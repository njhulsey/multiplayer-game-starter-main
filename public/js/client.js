// import { GameAssets} from '../shared/js/classes/GameAssets.js';


// const canvas = document.querySelector('canvas')
// const c = canvas.getContext('2d')
// const socket = io()

// const scoreEl = document.querySelector('#scoreEl')

// const devicePixelRation = window.devicePixelRatio || 1
// GameAssets.mouse.devicePixelRatio=devicePixelRation


// canvas.width = innerWidth * devicePixelRation
// canvas.height = innerHeight * devicePixelRation

// const frontEndPlayers = {}

// const startGameBtn = document.querySelector('#startGameBtn')
// const usernameLabel = document.querySelector('#username')
// const startMenu = document.querySelector('#startMenu')
// let animationId


// const keys = {
//   w : false,
//   a : false,
//   s : false,
//   d : false
// }

// import { Game } from './gameClient.js'; // absolute path from server root
// let game = new Game(canvas.width,canvas.height)

// function startGame(){
//   animate()
// }

// function animate() {
//   animationId = requestAnimationFrame(animate)
//   c.save()
// c.font = "bold 24px 'Bangers', cursive";
//   c.fillStyle = "black";           // set text color
//   c.textAlign = "center";          // center align on x
//   c.clearRect(0, 0, canvas.width, canvas.height)
//   game.draw(c)

//   c.restore()
// }


// //update movement 
// setInterval(()=>{
//   if(game.hasInit){

//     game.tick()
//     game.handleKeys(keys,socket)
//     game.handleMouse(GameAssets.mouse,socket) //basically send out the weapon data... wasnt sure if it needed mouse data or not
//   }
// },15)





// socket.on('updatePlayers', (backEndPlayers) => {
//   game.updatePlayers(backEndPlayers);  // call your Game method here

//   if(Object.keys(game.players).length > 0){
//     game.session_ID = socket.id
//   }

// });

// socket.on('updateWeapons', (backEndWeapons) => {
//   game.updateWeapons(backEndWeapons);  // call your Game method here

//   if(Object.keys(game.players).length > 0){
//     game.session_ID = socket.id
//   }

// });


// socket.on('selectWorld', (world_settings) => {
//   game.selectWorld(world_settings);  // call your Game method here

// });




// window.addEventListener('keydown',(event)=>{
//   switch(event.code){
//     case 'KeyW':
//       keys.w=true
//       break;
//     case 'KeyA':
//       keys.a=true
//       break;
//     case 'KeyS':
//       keys.s=true
//       break;
//     case 'KeyD':
//       keys.d=true
//       break;
//   }
  
// })

// window.addEventListener('keyup',(event)=>{

//   switch(event.code){
//     case 'KeyW':
//       keys.w=false
//       break;
//     case 'KeyA':
//       keys.a=false

//       break;
//     case 'KeyS':
//       keys.s=false

//       break;
//     case 'KeyD':
//       keys.d=false
//       break;
//   }
  
// })

// // Listen for mouse movement over the canvas
// canvas.addEventListener("mousemove", (event) => {
//   // Get bounding rectangle of the canvas
//   const rect = canvas.getBoundingClientRect();

//   // Calculate mouse coordinates relative to canvas
//   GameAssets.mouse.x = (event.clientX - rect.left) * (canvas.width / rect.width);
//   GameAssets.mouse.y = (event.clientY - rect.top) * (canvas.height / rect.height);
//   GameAssets.mouse.cameraX = game.camera.x
//   GameAssets.mouse.cameraY = game.camera.y

// });

// startGameBtn.addEventListener('click',(event)=>{
    
//     const data = {
//       username:usernameLabel.value,
//       player_class: 'warrior',
//       weapon:'hammer'
//     }
//     socket.emit('enterGame',data)
    
//     game.players[socket.id].username = usernameLabel.value
//     game.players[socket.id].player_class = GameAssets.PlayerClasses[data.player_class]
//     game.players[socket.id].equip(data.weapon)
//     game.players[socket.id].weapon.setSprite()
//     startMenu.style.display = "none";
    
//     game.init()
//     startGame()

// }) 


import { GameAssets } from '../shared/js/classes/GameAssets.js';
import { Game } from './gameClient.js'; // absolute path from server root

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const socket = io()

const scoreEl = document.querySelector('#scoreEl')

const devicePixelRation = window.devicePixelRatio || 1
GameAssets.mouse.devicePixelRatio = devicePixelRation


canvas.width = innerWidth * devicePixelRation
canvas.height = innerHeight * devicePixelRation

// const frontEndPlayers = {} // This variable is no longer needed as game.players manages this

const startGameBtn = document.querySelector('#startGameBtn')
const usernameInput = document.querySelector('#username') // Renamed from usernameLabel for clarity
const startMenu = document.querySelector('#startMenu')
const weaponMenu = document.querySelector('#weaponMenu')

// Get references to weapon buttons
const hammerBtn = document.getElementById('hammerBtn');
const swordBtn = document.getElementById('swordBtn');
const axeBtn = document.getElementById('axeBtn');
const weaponButtons = [hammerBtn, swordBtn, axeBtn]; // Array for easy iteration
let selectedWeapon = null; // To store the ID of the selected weapon (e.g., 'hammerBtn')

let animationId


const keys = {
    w: false,
    a: false,
    s: false,
    d: false
}


let game = new Game(canvas.width, canvas.height)

function startGame() {
    animate()
}

function animate() {
    animationId = requestAnimationFrame(animate)
    c.save()
    c.font = "bold 32px 'Bangers', cursive";
    c.fillStyle = "white"; // set text color
    c.textAlign = "center"; // center align on x
    c.clearRect(0, 0, canvas.width, canvas.height)
    game.draw(c)

    c.restore()
}


//update movement
setInterval(() => {
    if (game.hasInit) {
        game.tick()
        game.handleKeys(keys, socket)
        // Pass the selected weapon to the backend if needed, or handle it on the client side
        game.handleMouse(GameAssets.mouse, socket) // basically send out the weapon data... wasnt sure if it needed mouse data or not
    }
}, 15)


socket.on('updatePlayers', (backEndPlayers) => {
    game.updatePlayers(backEndPlayers); // call your Game method here

    if (Object.keys(game.players).length > 0) {
        game.session_ID = socket.id
    }

});

socket.on('updateWeapons', (backEndWeapons) => {
    game.updateWeapons(backEndWeapons); // call your Game method here

    if (Object.keys(game.players).length > 0) {
        game.session_ID = socket.id
    }

});


socket.on('selectWorld', (world_settings) => {
    game.selectWorld(world_settings); // call your Game method here

});


window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            keys.w = true
            break;
        case 'KeyA':
            keys.a = true
            break;
        case 'KeyS':
            keys.s = true
            break;
        case 'KeyD':
            keys.d = true
            break;
    }

})

window.addEventListener('keyup', (event) => {

    switch (event.code) {
        case 'KeyW':
            keys.w = false
            break;
        case 'KeyA':
            keys.a = false
            break;
        case 'KeyS':
            keys.s = false
            break;
        case 'KeyD':
            keys.d = false
            break;
    }

})

// Listen for mouse movement over the canvas
canvas.addEventListener("mousemove", (event) => {
    // Get bounding rectangle of the canvas
    const rect = canvas.getBoundingClientRect();

    // Calculate mouse coordinates relative to canvas
    GameAssets.mouse.x = (event.clientX - rect.left) * (canvas.width / rect.width);
    GameAssets.mouse.y = (event.clientY - rect.top) * (canvas.height / rect.height);
    GameAssets.mouse.cameraX = game.camera.x
    GameAssets.mouse.cameraY = game.camera.y

});


// Function to display custom messages (replaces alert)
function displayMessage(message, type) {
    let messageBox = document.getElementById('messageBox');
    if (!messageBox) {
        messageBox = document.createElement('div');
        messageBox.id = 'messageBox';
        messageBox.className = 'fixed top-0 left-1/2 -translate-x-1/2 mt-4 p-4 rounded-lg shadow-lg text-white font-bold transition-transform transform -translate-y-full opacity-0 z-50';
        document.body.appendChild(messageBox);
    }

    messageBox.textContent = message;
    if (type === "error") {
        messageBox.style.backgroundColor = '#ef4444'; // Red for error
    } else if (type === "success") {
        messageBox.style.backgroundColor = '#22c55e'; // Green for success
    } else {
        messageBox.style.backgroundColor = '#3b82f6'; // Blue for info
    }

    // Show message
    messageBox.classList.remove('-translate-y-full', 'opacity-0');
    messageBox.classList.add('translate-y-0', 'opacity-100');

    // Hide message after 3 seconds
    setTimeout(() => {
        messageBox.classList.remove('translate-y-0', 'opacity-100');
        messageBox.classList.add('-translate-y-full', 'opacity-0');
    }, 3000);
}


// Event listeners for weapon buttons and start game button, inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

    // Fallback for image URLs if they don't load
    hammerBtn.querySelector('img').onerror = function() {
        this.src = "https://placehold.co/120x120/EBF8FF/2B6CB0?text=Hammer";
    };
    swordBtn.querySelector('img').onerror = function() {
        this.src = "https://placehold.co/120x120/EBF8FF/2B6CB0?text=Sword";
    };
    axeBtn.querySelector('img').onerror = function() {
        this.src = "https://placehold.co/120x120/EBF8FF/2B6CB0?text=Axe";
    };

    // Event listener for weapon buttons
    weaponButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'selected' class from all buttons
            weaponButtons.forEach(btn => btn.classList.remove('selected'));

            // Add 'selected' class to the clicked button
            button.classList.add('selected');
            selectedWeapon = button.id.replace('Btn', ''); // Store the weapon type (e.g., 'hammer')
            console.log(`Selected weapon: ${selectedWeapon}`);
        });
    });

    // Event listener for Start Game button
    startGameBtn.addEventListener('click', (event) => {
        const username = usernameInput.value.trim();
        if (username === "") {
            displayMessage("Please enter your username.", "error");
        } else if (!selectedWeapon) {
            displayMessage("Please choose a weapon before starting the game.", "error");
        } else {
            displayMessage(`Welcome, ${username}! You've chosen the ${selectedWeapon}. Starting game...`, "success");

            console.log(selectedWeapon)
            const data = {
                username: username,
                player_class: 'warrior', // Assuming 'warrior' is default or will be selected elsewhere
                weapon: selectedWeapon // Use the dynamically selected weapon
            }
            socket.emit('enterGame', data)

            // Ensure game.players[socket.id] exists before trying to access its properties
            // This might be better handled after a confirmation from the server or in game.updatePlayers
            if (!game.players[socket.id]) {
                game.players[socket.id] = {}; // Initialize if it doesn't exist
            }            
            
            game.init();
            startGame();
            
            game.players[socket.id].username = username;
            game.players[socket.id].player_class = GameAssets.PlayerClasses[data.player_class];
            game.players[socket.id].equip(data.weapon);
            game.players[socket.id].weapon.setSprite();
            
            startMenu.style.display = "none";
            weaponMenu.style.display = "none";


        }
    });
});