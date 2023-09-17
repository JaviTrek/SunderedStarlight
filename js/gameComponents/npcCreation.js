import map from "./mapCreator.js";
import bestFriends from "./bestFriends.js";

// Function to place 5 random unique NPCs (values from 'anger' to 'guilt') in the map array
function placeRandomUniqueNPCs(map) {
    let availablePositions = [];
    let uniqueNPCs = ['anger', 'denial', 'depression', 'acceptance', 'guilt']; // Updated to unique NPC names

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

    // Shuffle the unique NPCs
    for (let i = uniqueNPCs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [uniqueNPCs[i], uniqueNPCs[j]] = [uniqueNPCs[j], uniqueNPCs[i]];
    }

    // Take the first 5 positions and place unique NPCs there
    for (let i = 0; i < Math.min(5, availablePositions.length, uniqueNPCs.length); i++) {
        const [x, y] = availablePositions[i];
        map[y][x] = uniqueNPCs[i];
    }
}

// Place 5 random unique NPCs in the map
placeRandomUniqueNPCs(map);

const npcMap = map;
export default npcMap;