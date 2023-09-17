import map from "./mapCreator.js"

// Function to place 5 random NPCs (value 2) in the map array
function placeRandomNPCs(map) {
    let availablePositions = [];

    // Gather all available positions where the value is 1
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === 1) {
                availablePositions.push([x, y]);
            }
        }
    }

    // Shuffle the available positions
    for (let i = availablePositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
    }

    // Take the first 5 positions and place NPCs there
    for (let i = 0; i < Math.min(5, availablePositions.length); i++) {
        const [x, y] = availablePositions[i];
        map[y][x] = 2;
    }
}


// Place 5 random NPCs in the map
placeRandomNPCs(map);


const npcMap = map;
export default  npcMap;