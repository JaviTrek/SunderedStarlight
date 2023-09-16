import {Container, Graphics} from "pixi.js";

let mapContainer = new Container();
console.log(mapContainer)

const rectangle = new Graphics();
rectangle.beginFill(0xffffff)
    .drawRect(10, 10, 100, 100)
    .endFill();

mapContainer.addChild(rectangle);

export default mapContainer;

