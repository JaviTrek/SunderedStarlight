import map from "./mapCreator.js";

const bestFriends = [
    {
        name: "anger",
        personality: "I am a strong, independent woman who is upset about my unsupportive, disrespectful husband. I will get my revenge at any cost."
    },
    {
        name: "guilt",
        personality: "I am a young, vulnerable girl who ran away from home and I miss my family. I feel bad for leaving the people I love behind. I regret not reaching out to them more."
    },
    {
        name: "denial",
        personality: "I am a strong, rude boy who refuses to believe that I am wrong in a fight I had with a friend. I am right, no matter what."
    },
    {
        name: "depression",
        personality: "I am a small, anxious boy who has lost my sense of ambition. How will I ever live up to be like my parents? is there any point at all?"
    },
    {
        name: "acceptance",
        personality: "I am an old, wise grandmother who is preparing for death. My life has been long, vivid, and wonderful and I am ready for my next chapter. I will be the stars, the sun, and the moon."
    },
];

function placeRandomUniqueNPCs(map) {
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

    // Shuffle the unique NPCs
    for (let i = bestFriends.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bestFriends[i], bestFriends[j]] = [bestFriends[j], bestFriends[i]];
    }

    // Take the first 5 positions and place unique NPCs there
    for (let i = 0; i < Math.min(5, availablePositions.length, bestFriends.length); i++) {
        const [x, y] = availablePositions[i];
        bestFriends[i].position = x * y;  // Add position property
        map[y][x] = bestFriends[i];  // Place the NPC object in the map
    }
}

// Place 5 random unique NPCs in the map
placeRandomUniqueNPCs(map);

const npcMap = map;
export default npcMap;
