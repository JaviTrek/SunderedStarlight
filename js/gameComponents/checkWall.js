import map from "./mapCreator.js";

export default function checkWall(newX,newY, characterX, characterY) {
    let y = newX / 100;
    let x = newY / 100 + 1;

    if (map[characterY / 100 + 1][characterX / 100] === 0) return true;

    return map[x][y];
}