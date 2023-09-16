import * as PIXI from 'pixi.js';

// Parent Container
const startGameBox = new PIXI.Container();
startGameBox.sortableChildren = true;


// Child Container
const startGameText = new PIXI.Container();
// Send to front
startGameText.zIndex = 100;

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 72,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#000000'], // gradient
    stroke: '#4a1850',
    strokeThickness: 250,
    dropShadow: true,
    dropShadowColor: '#FFFFFF',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 60,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});

startGameBox.addChild(startGameText);

// Start screen text
const basicText = new PIXI.Text('Sundered Starlight', style);

startGameText.x = 350;
startGameText.y = 375;

startGameText.addChild(basicText);

// Start screen Background
PIXI.Assets.load('media/purpleBrickWall.jpg').then((texture) =>
{
    const plane = new PIXI.SimplePlane(texture, 10, 10);

    plane.x = 250 // app.screen.width/2;
    plane.y = 250 // app.screen.height/2;
    plane.zIndex = 0;

    startGameBox.addChild(plane);

    // Get the buffer for vertice positions.
    const buffer = plane.geometry.getBuffer('aVertexPosition');

    // Listen for animate update
    let timer = 0;

    app.ticker.add(() =>
    {
        // Randomize the vertice positions a bit to create movement.
        for (let i = 0; i < buffer.data.length; i++)
        {
            buffer.data[i] += Math.sin((timer / 10) + i) * 0.01;
        }
        buffer.update();
        timer++;
    });
});

export default startGameBox;