// main.js
// Create the application helper and add its render target to the page



import {AnimatedSprite, Application, BaseTexture, Container, Graphics, Sprite, Spritesheet} from "pixi.js";
import checkWall from "./gameComponents/checkWall.js";
import npcMap from "./gameComponents/mapCreator.js"
import map from "./gameComponents/mapCreator.js";



let app = new Application({
    width: window.innerWidth, height: window.innerHeight,

})

document.body.appendChild(app.view);

let mapContainer = new Container;
app.stage.scale.set(1,1);
app.stage.x = 0;
app.stage.y = 0;

map.forEach((row, rowIndex) => {

    let y = rowIndex * 100;
    row.forEach((col, colIndex) => {
        let x = colIndex * 100;
        const rectangle = new Graphics();
        if(col === 0) {
            rectangle.beginFill(0xdddddd)
                .lineStyle(1, 0x000000, 1)
                .drawRect(x, y, 100, 100)
                .endFill();
            mapContainer.addChild(rectangle);
        } else {
            const floor = Sprite.from("./tile.png")
            floor.width = 100;
            floor.height = 100;
            floor.x = x;
            floor.y = y

            rectangle
                .lineStyle(1, 0x000000, 1)
                .drawRect(x, y, 100, 100)


            mapContainer.addChild(floor)
            mapContainer.addChild(rectangle)


        }

    })
})

//jingoism everyday
import characterSprite from "../public/warrior.json"


const spritesheet = new Spritesheet(
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
character.width = 100;
character.height = 200;
character.x = 600;
character.y = 300;





document.addEventListener("keydown", function(event) {

    const tileAmount = (npcMap.length - 2 ) * 100;

    switch(event.key) {
        case "w":
        case "W":
            if (character.y !== 0 && checkWall(character.x, character.y - 100, character.x, character.y)) {
                character.y -= 100;
                mapContainer.y += 100;
                // Your code for the W key goes here
            }

            break;
        case "a":
        case "A":
            if (character.x !== 0 && checkWall(character.x - 100, character.y, character.x, character.y)) {

                if (character.scale.x > 0) {
                    character.scale.x *= -1;
                    character.x += 100;
                    mapContainer.x += 0;
                } else {
                    character.x -= 100;
                    mapContainer.x += 100;
                }
            }

            // Your code for the A key goes here
            break;
        case "s":
        case "S":
            if (character.y !== tileAmount && checkWall(character.x, character.y + 100, character.x, character.y)) {
                character.y += 100;
                mapContainer.y -= 100;
            }
            // Your code for the S key goes here
            break;
        case "d":
        case "D":
            if (character.x !== tileAmount && checkWall(character.x + 100, character.y, character.x, character.y)) {

                if (character.scale.x < 0) {
                    character.scale.x *= -1;    /* flip vertically */
                    character.x -= 100;
                    mapContainer.x -= 0;
                } else {
                    character.x += 100;
                    mapContainer.x -= 100;
                }


            }
            // Your code for the D key goes here
            break;
    }
});




app.stage.addChild(mapContainer)
app.stage.addChild(character)
//app.stage.addChild(mapCreator)