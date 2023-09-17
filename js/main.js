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
import characterSprite from "../public/warrior.json"
import talkFunction from "./gameComponents/talkContainer.js";


let spritesheet = new Spritesheet(
    BaseTexture.from(characterSprite.meta.image),
    characterSprite
);

// Generate all the Textures asynchronously
await spritesheet.parse();

// spritesheet is ready to use!
const character = new AnimatedSprite(spritesheet.animations.MainStill);

// set the animation speed
character.animationSpeed = 0.1;
// play the animation on a loop
character.play();
// add it to the stage to render
character.width = gridSize;
character.height = 200;
character.x = 600
character.y = 300

document.addEventListener("keydown", function(event) {
    const tileAmount = (npcMap.length - 2 ) * gridSize;
    let wall;
    switch(event.key) {
        case "w":
        case "W":
             wall = checkWall(character.x, character.y - gridSize, character.x, character.y)
            if (character.y !== 0 && wall !== 0) {
                character.y -= gridSize;
                app.stage.y += gridSize;
            }
            break;

        case "a":
        case "A":
             wall = checkWall(character.x - gridSize, character.y, character.x, character.y)
            if (character.x !== 0 &&  wall !== 0) {
                if (wall === 2) {
                    talkFunction;
                } else {
                    if (character.scale.x > 0) {

                        character.scale.x *= -1;
                    } else {
                        character.x -= gridSize;
                        app.stage.x += gridSize;
                    }
                }
            }

            // Your code for the A key goes here
            break;
        case "s":
        case "S":
             wall = checkWall(character.x, character.y + gridSize, character.x, character.y)
            if (character.y !== tileAmount && wall !== 0) {

                if (wall === 2) {
                    talkFunction;
                } else {

                    character.y += gridSize;
                    app.stage.y -= gridSize;
                }
            }
            // Your code for the S key goes here
            break;
        case "d":
        case "D":
             wall = checkWall(character.x + gridSize, character.y, character.x, character.y)
            if (character.x !== tileAmount && wall !== 0) {
                if (wall === 2) {
                    talkFunction();
                } else {
                    if (character.scale.x < 0) {
                        character.scale.x *= -1;    /* flip vertically */
                    } else {
                        character.x += gridSize;
                        app.stage.x -= gridSize;
                    }

                }
            }
            // Your code for the D key goes here
            break;
    }
});




// NPC

npcMap.forEach((row, rowIndex) => {
    let y = rowIndex * 100;
    row.forEach((col, colIndex) => {
        let x = colIndex * 100;
        const rectangle = new Graphics();
        if(col === 2) {
            rectangle.beginFill(0xa89532)
                .lineStyle(1, 0x000000, 1)
                .drawRect(x, y, gridSize, gridSize)
                .endFill();
            mapContainer.addChild(rectangle);
        }

    })
})



app.stage.addChild(mapContainer)
app.stage.addChild(character)
//app.stage.addChild(mapCreator)