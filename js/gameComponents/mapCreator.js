// 2D array to represent the map; 0 is empty, 1 is wall
const map = Array(50).fill(null).map(() => Array(50).fill(0));

// Rectangle class as before
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.leftChild = null;
        this.rightChild = null;
    }

    split() {
        const splitHorizontally = Math.random() > 0.5;
        if (splitHorizontally) {
            const splitAt = Math.floor(Math.random() * (this.height - 20)) + 10;
            this.leftChild = new Rectangle(this.x, this.y, this.width, splitAt);
            this.rightChild = new Rectangle(this.x, this.y + splitAt, this.width, this.height - splitAt);
        } else {
            const splitAt = Math.floor(Math.random() * (this.width - 20)) + 10;
            this.leftChild = new Rectangle(this.x, this.y, splitAt, this.height);
            this.rightChild = new Rectangle(this.x + splitAt, this.y, this.width - splitAt, this.height);
        }
    }
}

// Recursive function as before
function recursiveSplit(rect, depth = 0, maxDepth = 4) {
    if (depth >= maxDepth || (rect.width < 20 && rect.height < 20)) {
        return;
    }

    rect.split();
    recursiveSplit(rect.leftChild, depth + 1, maxDepth);
    recursiveSplit(rect.rightChild, depth + 1, maxDepth);
}

// Function to fill in the map array based on the BSP rectangles
function fillMap(rect) {
    if (rect.leftChild || rect.rightChild) {
        if (rect.leftChild) fillMap(rect.leftChild);
        if (rect.rightChild) fillMap(rect.rightChild);
        return;
    }

    // This is a leaf node; fill it in on the map
    for (let x = rect.x + 1; x < rect.x + rect.width - 1; x++) {
        for (let y = rect.y + 1; y < rect.y + rect.height - 1; y++) {
            map[y][x] = 1;
        }
    }
}




// Function to add a corridor between two rectangles on the map
function addCorridor(rect1, rect2) {
    let x1 = Math.floor(rect1.x + rect1.width / 2);
    let y1 = Math.floor(rect1.y + rect1.height / 2);
    let x2 = Math.floor(rect2.x + rect2.width / 2);
    let y2 = Math.floor(rect2.y + rect2.height / 2);

    while (x1 !== x2 || y1 !== y2) {
        if (x1 !== x2) {
            if (x1 < x2) {
                map[y1][x1] = 1;
                map[y1][x1 + 1] = 1;
            } else {
                map[y1][x1] = 1;
                map[y1][x1 - 1] = 1;
            }
        } else if (y1 !== y2) {
            if (y1 < y2) {
                map[y1][x1] = 1;
                map[y1 + 1][x1] = 1;
            } else {
                map[y1][x1] = 1;
                map[y1 - 1][x1] = 1;
            }
        }

        if (x1 < x2) {
            map[y1][++x1] = 1;
        } else if (x1 > x2) {
            map[y1][--x1] = 1;
        }

        if (y1 < y2) {
            map[++y1][x1] = 1;
        } else if (y1 > y2) {
            map[--y1][x1] = 1;
        }
    }
}

// Modified fillMap function to also add corridors
function fillMapWithCorridors(rect) {
    if (rect.leftChild || rect.rightChild) {
        if (rect.leftChild) fillMapWithCorridors(rect.leftChild);
        if (rect.rightChild) fillMapWithCorridors(rect.rightChild);

        if (rect.leftChild && rect.rightChild) {
            addCorridor(rect.leftChild, rect.rightChild);
        }
        return;
    }

    // Existing fillMap logic for adding rooms...
    for (let x = rect.x + 1; x < rect.x + rect.width - 1; x++) {
        for (let y = rect.y + 1; y < rect.y + rect.height - 1; y++) {
            map[y][x] = 1;
        }
    }
}

// Main code
const root = new Rectangle(0, 0, 50, 50);
recursiveSplit(root);
fillMapWithCorridors(root);



console.log(map)
export default map;

