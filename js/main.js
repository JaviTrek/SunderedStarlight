// main.js
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

const Graphics = PIXI.Graphics;

const rectangle = new Graphics();
rectangle.beginFill(0xAA33BB)
    .lineStyle(4, 0xAE3EBE, 1)
    .drawRect(200, 200, 100, 100)
    .endFill();

app.stage.addChild(rectangle);