// main.js
// Create the application helper and add its render target to the page



import {AnimatedSprite, Application, BaseTexture, Container, Graphics, Sprite, Spritesheet} from "pixi.js";
import checkWall from "./gameComponents/checkWall.js";
import npcMap from "./gameComponents/npcCreation.js";
import map from "./gameComponents/mapCreator.js";



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
            mapContainer.addChild(floor);
        } else {
            const floor = Sprite.from("./BG1.png")
            floor.width = gridSize;
            floor.height = gridSize;
            floor.x = x;
            floor.y = y

            rectangle
                .lineStyle(1, 0x000000, 1)
                .drawRect(x, y, gridSize, gridSize)


            mapContainer.addChild(floor)
           // mapContainer.addChild(rectangle)


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

document.addEventListener("keydown", function(event) {
    const tileAmount = (npcMap.length - 2 ) * gridSize;
    let wall;
    switch(event.key) {
        case "w":
        case "W":
             wall = checkWall(character.x, character.y - gridSize, character.x, character.y)

            if (character.y !== 0 && wall !== 0) {
                if (wall === 2) {
                    talkFunction(character.x, character.y - gridSize,);
                } else {
                    character.y -= gridSize;
                    app.stage.y += gridSize;
                    characterLeft.x = character.x
                    characterLeft.y = character.y
                }
            }
            break;

        case "a":
        case "A":
             wall = checkWall(character.x - gridSize, character.y, character.x, character.y)

             character.alpha = 0;
             characterLeft.alpha = 1;


            if (character.x !== 0 &&  wall !== 0) {
                if (wall === 2) {
                    talkFunction(character.x - gridSize, character.y);
                } else {

                        character.x -= gridSize;
                        app.stage.x += gridSize;
                    characterLeft.x = character.x
                    characterLeft.y = character.y

                }
            }


            // Your code for the A key goes here
            break;
        case "s":
        case "S":
             wall = checkWall(character.x, character.y + gridSize, character.x, character.y)
            if (character.y !== tileAmount && wall !== 0) {

                if (wall === 2) {
                    talkFunction(character.x, character.y + gridSize);
                } else {

                    character.y += gridSize;
                    app.stage.y -= gridSize;
                    characterLeft.x = character.x
                    characterLeft.y = character.y
                }
            }
            // Your code for the S key goes here
            break;
        case "d":
        case "D":
             wall = checkWall(character.x + gridSize, character.y, character.x, character.y)

            character.alpha = 1;
            characterLeft.alpha = 0;

            if (character.x !== tileAmount && wall !== 0) {
                if (wall === 2) {
                    talkFunction(character.x + gridSize, character.y);
                } else {
                        character.x += gridSize;
                        app.stage.x -= gridSize;
                    characterLeft.x = character.x
                    characterLeft.y = character.y
                }
            }


            // Your code for the D key goes here
            break;
    }
});




// NPC
import bestFriends from "./gameComponents/bestFriends.js";


npcMap.forEach((row, rowIndex) => {


    let y = rowIndex * 100;
    row.forEach(async (col, colIndex) => {
        let x = colIndex * 100;
        const rectangle = new Graphics();
        if(col === 2) {

            if (bestFriends.length !== 0) {

                let ourFriend = await bestFriends.pop();

                let npcCharacter = new AnimatedSprite(spritesheetNPC.animations[`${ourFriend.name}`]);

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

        }

    })
})



app.stage.addChild(mapContainer)
app.stage.addChild(character)
app.stage.addChild(characterLeft)
//app.stage.addChild(mapCreator)