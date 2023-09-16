import map from "./mapCreator.js";

export default function checkWall(newX,newY, characterX, characterY) {
    let y = newX / 100;
    let x = newY / 100 + 1;

    if (map[characterY / 100 + 1][characterX / 100] === 0) return true;

    console.log(map)
    console.log(x, y)
    console.log(map[x][y]);
    return map[x][y] !== 0;
}