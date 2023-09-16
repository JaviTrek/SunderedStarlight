// main.js
// Create the application helper and add its render target to the page



import {AnimatedSprite, Application, BaseTexture, Container, Graphics, Sprite, Spritesheet} from "pixi.js";
import mapCreator from "./mapCreator.js";
import map from "./gameComponents/mapCreator.js"



let app = new Application({
    width: 1800, height: 800,

})

document.body.appendChild(app.view);

let mapContainer = new Container;
app.stage.scale.set(1,1);

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
        } else {
            rectangle.beginFill(0xffffff)
                .lineStyle(1, 0x787053, 1)
                .drawRect(x, y, 100, 100)
                .endFill();
        }
        mapContainer.addChild(rectangle);
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
character.x = 400;
character.y = 300;


function checkWall(newX,newY) {
    let y = newX / 100;
    let x = newY / 100 + 1;

    console.log(map)
    console.log(x, y)
    console.log(map[x][y]);
    return map[x][y] !== 0;
}


document.addEventListener("keydown", function(event) {




    const tileAmount = (map.length - 2 ) * 100;

    switch(event.key) {
        case "w":
        case "W":
            if (character.y !== 0 && checkWall(character.x, character.y - 100)) {

                character.y -= 100;
                app.stage.y += 100;
                // Your code for the W key goes here
            }

            break;
        case "a":
        case "A":
            if (character.x !== 0 && checkWall(character.x - 100, character.y)) {
                character.x -= 100;
                app.stage.x += 100;
            }

            // Your code for the A key goes here
            break;
        case "s":
        case "S":
            if (character.y !== tileAmount && checkWall(character.x, character.y + 100)) {
                character.y += 100;
                app.stage.y -= 100;
            }
            // Your code for the S key goes here
            break;
        case "d":
        case "D":
            if (character.x !== tileAmount && checkWall(character.x + 100, character.y)) {
                character.x += 100;
                app.stage.x -= 100;
            }
            // Your code for the D key goes here
            break;
    }
});




app.stage.addChild(mapContainer)
app.stage.addChild(character)
//app.stage.addChild(mapCreator)