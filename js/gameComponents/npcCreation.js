import map from "mapCreator.js"

// Function to find rooms in the map. A room is a collection of adjacent '1's.
function findRooms(map) {
    const visited = Array.from({ length: map.length }, () => Array(map[0].length).fill(false));

    const rooms = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 1 && !visited[y][x]) {
                const room = [];
                const stack = [[x, y]];

                while (stack.length > 0) {
                    const [cx, cy] = stack.pop();
                    if (visited[cy][cx]) continue;
                    visited[cy][cx] = true;

                    room.push([cx, cy]);

                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            if (dx * dx + dy * dy !== 1) continue; // Skip diagonals and (0, 0)
                            const [nx, ny] = [cx + dx, cy + dy];

                            if (ny >= 0 && ny < map.length && nx >= 0 && nx < map[ny].length && map[ny][nx] === 1) {
                                stack.push([nx, ny]);
                            }
                        }
                    }
                }

                rooms.push(room);
            }
        }
    }

    return rooms;
}

// Function to place one NPC (value 2) in each room.
function placeNPCs(map, rooms) {
    const npcMap = map.map(row => row.slice()); // Create a deep copy of the map

    rooms.forEach(room => {
        const [randomX, randomY] = room[Math.floor(Math.random() * room.length)];
        npcMap[randomY][randomX] = 2;
    });

    return npcMap;
}

// Your existing map (for example)


// Find rooms and place NPCs
const rooms = findRooms(map);
const npcMap = placeNPCs(map, rooms);

// Print the map with NPCs
npcMap.forEach(row => {
    console.log(row.map(cell => {
        if (cell === 0) return " ";
        if (cell === 1) return "#";
        if (cell === 2) return "N";
    }).join(""));
});

console.log(npcMap)
export default  npcMap;