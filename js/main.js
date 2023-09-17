// main.js
// Create the application helper and add its render target to the page



import {AnimatedSprite, Application, BaseTexture, Container, Graphics, Sprite, Spritesheet} from "pixi.js";
import checkWall from "./gameComponents/checkWall.js";
import npcMap from "./gameComponents/npcCreation.js";
import map from "./gameComponents/mapCreator.js";

// Create new audio object
const audio = new Audio('./ambient_rumble_tumble_with_loop.mp3');

// When audio is loaded, play it
audio.addEventListener('canplaythrough', (event) => {
    audio.play();
});

// Set the audio to loop
audio.loop = true;


let app = new Application({
    width: window.innerWidth, height: window.innerHeight,

})

document.body.appendChild(app.view);

let mapContainer = new Container;
app.stage.scale.set(1,1);
app.stage.x = 0;
app.stage.y = 0;



const gridSize = 100

map.forEach((row, rowIndex) => {

    let y = rowIndex * 100;
    row.forEach((col, colIndex) => {
        let x = colIndex * 100;
        const rectangle = new Graphics();
        if(col === 0) {



            const floor = Sprite.from("./BG2.png")
            floor.width = gridSize;
            floor.height = gridSize;
            floor.x = x;
            floor.y = y

            const green = 200 + Math.floor(Math.random() * 56); // 200 to 255
            const blue = 200 + Math.floor(Math.random() * 56);  // 200 to 255
            const cyanTint = 0x00 << 16 | green << 8 | blue;


// Apply the tint to the sprite
            floor.tint = cyanTint;

            mapContainer.addChild(floor);

        } else {
            const floor = Sprite.from("./BG1.png")
            floor.width = gridSize;
            floor.height = gridSize;
            floor.x = x;
            floor.y = y
            const greyValue = 200 + Math.floor(Math.random() * 56); // 200 to 255
            const greyTint = greyValue << 16 | greyValue << 8 | greyValue;
            floor.tint = greyTint;

            rectangle
                .lineStyle(1, 0x000000, 1)
                .drawRect(x, y, gridSize, gridSize)


            const isTrue = Math.random() < 0.1;
            const rocks = Array.from({ length: 5 }, (_, i) => `rock${i + 1}`);

            let rockNum = Math.floor(Math.random() * 5);
            let rockSprite = Sprite.from(`./${rocks[rockNum]}.png`)
            rockSprite.width = gridSize;
            rockSprite.height = gridSize;
            rockSprite.alpha = .8
            rockSprite.x = x ;
            rockSprite.y = y ;




            mapContainer.addChild(floor)
           // mapContainer.addChild(rectangle)
            if (isTrue && col === 1) {


                mapContainer.addChild(rockSprite)
            }

        }

    })
})


// CHARACTER
//jingoism everyday
import characterSprite from "../public/sprite/main.json"
import npcSprite from "../public/sprite/npc-notouchy.json"

import talkFunction from "./gameComponents/talkContainer.js";


let spritesheet = new Spritesheet(
    BaseTexture.from(characterSprite.meta.image),
    characterSprite
);

// Generate all the Textures asynchronously
await spritesheet.parse();

let spritesheetNPC = new Spritesheet(
    BaseTexture.from(npcSprite.meta.image),
    npcSprite
);

// Generate all the Textures asynchronously
await spritesheetNPC.parse();

// spritesheet is ready to use!
let character = new AnimatedSprite(spritesheet.animations["Main-Still"]);
let characterLeft = new AnimatedSprite(spritesheet.animations["Main-Still-Left"]);
console.log(character.texture)

// set the animation speed
character.animationSpeed = 0.1;
// play the animation on a loop
character.play();
// add it to the stage to render
character.width = gridSize;
character.height = 200;
character.x = 600
characterLeft.alpha = 1;
character.y = 300

characterLeft.animationSpeed = 0.1;
// play the animation on a loop
characterLeft.play();
// add it to the stage to render
characterLeft.width = gridSize;
characterLeft.height = 200;
characterLeft.alpha = 0;
characterLeft.x = 600
characterLeft.y = 300


/*const overlay = new Graphics();
overlay.beginFill(0x000000, 0.7);  // Black, 70% opacity
overlay.drawRect(0, 0, app.screen.width, app.screen.height);
overlay.endFill();
mapContainer.addChild(overlay);

// Create a mask sprite (a circle in your case)
const circleMask = Sprite.from('./mask.png');
circleMask.anchor.set(0.5);
circleMask.width = 500;
circleMask.height = 500;
circleMask.x = character.x + 100;
circleMask.y = character.y + 200;
overlay.mask = circleMask;*/

document.addEventListener("keydown", function(event) {
    const tileAmount = (npcMap.length - 2 ) * gridSize;
    let wall;
    switch(event.key) {
        case "ArrowUp":
            wall = checkWall(character.x, character.y - gridSize, character.x, character.y)

            if (character.y !== 0 && wall !== 0) {
                if (wall !== 0 && wall !== 1) {
                    showContainer();
                    localStorage.setItem('lastHitNPC', JSON.stringify(wall));
                } else {
                    hideContainer();
                    character.y -= gridSize;
                    app.stage.y += gridSize;
                    characterLeft.x = character.x;
                    characterLeft.y = character.y;
                }
            }
            break;

        case "ArrowLeft":
            wall = checkWall(character.x - gridSize, character.y, character.x, character.y)

            character.alpha = 0;
            characterLeft.alpha = 1;

            if (character.x !== 0 && wall !== 0) {
                if (wall !== 0 && wall !== 1) {
                    showContainer();
                    localStorage.setItem('lastHitNPC', JSON.stringify(wall));
                } else {
                    hideContainer();
                    character.x -= gridSize;
                    app.stage.x += gridSize;
                    characterLeft.x = character.x;
                    characterLeft.y = character.y;
                }
            }
            break;

        case "ArrowDown":
            wall = checkWall(character.x, character.y + gridSize, character.x, character.y)

            if (character.y !== tileAmount && wall !== 0) {
                if (wall !== 0 && wall !== 1) {
                    showContainer();
                    localStorage.setItem('lastHitNPC', JSON.stringify(wall));
                } else {
                    hideContainer();
                    character.y += gridSize;
                    app.stage.y -= gridSize;
                    characterLeft.x = character.x;
                    characterLeft.y = character.y;
                }
            }
            break;

        case "ArrowRight":
            wall = checkWall(character.x + gridSize, character.y, character.x, character.y)

            character.alpha = 1;
            characterLeft.alpha = 0;

            if (character.x !== tileAmount && wall !== 0) {
                if (wall !== 0 && wall !== 1) {
                    showContainer();
                    localStorage.setItem('lastHitNPC', JSON.stringify(wall));
                } else {
                    hideContainer();
                    character.x += gridSize;
                    app.stage.x -= gridSize;
                    characterLeft.x = character.x;
                    characterLeft.y = character.y;
                }
            }
            break;
    }
});


// NPC
import bestFriends from "./gameComponents/bestFriends.js";
import {hideContainer, showContainer} from "./chatGPT.js";

let npcCount = 0;
npcMap.forEach((row, rowIndex) => {


    let y = rowIndex * 100;
    row.forEach(async (col, colIndex) => {
        let x = colIndex * 100;
        const rectangle = new Graphics();
        if(col !== 1 && col !== 0 && npcCount !== 5) {
            console.log(col)
                let npcCharacter = new AnimatedSprite(spritesheetNPC.animations[`${col.name}`]);

                npcCharacter.animationSpeed = 0.1;
                npcCharacter.play();
                npcCharacter.width = gridSize;
                npcCharacter.height = gridSize;
                npcCharacter.x = x
                npcCharacter.y = y
                rectangle.beginFill(0xa89532)
                    .lineStyle(1, 0x000000, 0.8)
                    .drawRect(x, y, gridSize, gridSize)
                    .endFill();
                //mapContainer.addChild(rectangle);
                mapContainer.addChild(npcCharacter);
            }



    })
})



app.stage.addChild(mapContainer)
app.stage.addChild(character)
app.stage.addChild(characterLeft)
//app.stage.addChild(mapCreator)