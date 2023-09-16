// main.js
import * as PIXI from "pixi.js";
import startGameBox from "./startGameBox";
// Create the application helper and add its render target to the page
let app = new PIXI.Application({
    width: 1920, height: 1080,
    transparent: false,
    antialias: true
})

app.renderer.backgroundColor = 0x131313;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);
console.log(startGameBox);
app.stage.addChild(startGameBox);