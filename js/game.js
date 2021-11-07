// global variables
let canvas;
let ctx;
let WIDTH = 600;
let HEIGHT = 400;
let TILESIZE = 32;

// for pressing the up and down key
let keysDown = {};
let keysUp = {};

let gamePlan = `
......................
..#................#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;

// when you press the down arrow key the object goes down
addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    console.log("key down is " + keysDown[event.key]);
    console.log(keysDown);
}, false);

// when you press the up arrow key the object goes up 
addEventListener("keyup", function (event) {
    // keysUp[event.key] = true;
    delete keysDown[event.key];
    console.log(keysDown);
    console.log(keysUp);
}, false);

// init, or initialize, helps create the canvas. Has a width, height, etc. 
function init() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    gameLoop();
}

// The attributes of the square creation such as color, speed, width, height. 
class Square {
    constructor(id, x, y, speed, w, h, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    // creating different squares with different attributes
    create(id, x, y, speed, w, h, color) {
        return new Square(id, x, y, speed, w, h, color);
    }
    // creating boundaries for where the squares can travel, if they go too far away it will console log I fell off the side
    update() {
        if (this.x >= WIDTH - this.w || this.x < 0) {
            // console.log("I fell off the side!!!!")
            this.speed = -this.speed;
        }
        this.x += this.speed;
        // this.y += Math.random()*5*this.speed;
        // console.log(this.x);
    };
    // drawing the squares
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}

// the attributrs for the manually controlled square (me).
class Player extends Square {
    constructor(id, x, y, speed, w, h, color, hitpoints) {
        super(id, x, y, speed, w, h, color);
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
    }
    // expanding the possible keys. each key in wasd corresponds to a different motion. w is up, a is left, etc
    update() {
        if ('w' in keysDown) {
            this.y -= this.speed;
        }
        if ('a' in keysDown) {
            this.x -= this.speed;
        }
        if ('s' in keysDown) {
            this.y += this.speed;
        }
        if ('d' in keysDown) {
            this.x += this.speed;
        }

        // this.y += Math.random()*5*this.speed;
        // console.log(this.x);
    };
}

// to represent the grid from earlier, each dot is an empty space while each hashtag represents a square
const levelChars = {
    ".": "empty",
    "#": Square,
};
// to make the grid you need to create a new row which keeps pushing i until you have a new line
// and then if there is no more remainder you push the row into the grid and the row resets
function makeGrid(plan, width) {
    let newGrid = [];
    let newRow = [];
    for (i of plan) {
        if (i != "\n") {
            newRow.push(i);
        }
        if (newRow.length % width == 0 && newRow.length != 0) {
            newGrid.push(newRow);
            newRow = [];
        }
    }
    return newGrid;
}


console.log(makeGrid(gamePlan, 22));
// there are two loops. for the loops dealing with x grid values, the character has a (x,y) value. 
// if the character has not reached the end of the line, then if it is a dot, its empty, if theres a hashtag a square
// and then you keept pushing the square for every empty space (dot)
function readLevel(grid) {
    let startActors = [];
    // note the change from i to x and y
    for (y in grid) {
        for (x of grid[y]) {
            /*              crate a variable based on the current
            item in the two dimensional array being read
             */
            let ch = grid[y][x];
            /* if the character is not a new line character
            create a variable from the value attached to the 
            key in the object, e.g. 

            const levelChars = {
                ".": "empty",
                "#": Square,
            };

            where "." is the key and the value is "empty"
            In the case of "#", the key is "#" and the value
            is the Square class.
            
            */
            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                }
                else {
                    let t = new type;
                    // let id = Math.floor(100*Math.random());
                /*  Here we can use the x and y values from reading the grid, 
                    then adjust them based on the tilesize
                     */
                    startActors.push(t.create("square", x * TILESIZE, y * TILESIZE, 3, TILESIZE, TILESIZE, 'red'))
                }
            }
        }
    }
    return startActors;
}


let currentLevel = readLevel(makeGrid(gamePlan, 22))
console.log(currentLevel);

// instantiations. creating the characteristics of each square on the screen. width, height, speed, color, etc
let player1 = new Player("Me", WIDTH / 2, HEIGHT / 2, 1, 40, 40, 'rgb(100, 100, 100)', 100);
let oneSquare = new Square("Bob", 10, 10, 1, 50, 50, 'rgb(200, 100, 200)');
let twoSquare = new Square("Chuck", 60, 60, 5, 100, 100, 'rgb(200, 200, 0)');
let threeSquare = new Square("Bill", 70, 70, 3, 25, 25, 'rgb(100, 100, 222)');

let allSprites = [oneSquare, twoSquare, threeSquare, player1];

// update on actions after movement
function update() {
    for (i of allSprites) {
        // console.log(i);
        i.update();
    }

    // oneSquare.update();
    // twoSquare.update();
}
// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        // console.log(i);
        i.draw();
    }
}
// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (likg a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}