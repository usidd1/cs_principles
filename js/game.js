// global variables
let canvas;
let ctx;
let TILESIZE = 64;
let WIDTH = TILESIZE * 22;
let HEIGHT = TILESIZE * 9;
let allSprites = [];
let walls = [];



// get user input from keyboard
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
    // console.log("key down is " + keysDown[event.key]);
}, false);

// when you press the up arrow key the object goes up 
addEventListener("keyup", function (event) {
    // keysUp[event.key] = true;
    delete keysDown[event.key];
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

// The attributes of the sprite creation such as color, width, height. 
class Sprite {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        allSprites.push(this);
    }
    // returning type as a string "sprite"
    get type() {
        return "sprite";
    }
    // creating different sprites with different attributes
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    // drawing the sprites
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}

// the attributes for the manually controlled sprite (player,me)
class Player extends Sprite {
    constructor(x, y, speed, w, h, color, hitpoints) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
    }
    // identifies when the player collides with the wall, returns a console.log
    collideWith(obj){
        if (this.x + this.w > obj.x &&
            this.x < obj.x + obj.w &&
            this.y + this.h > obj.y &&
            this.y < obj.y + obj.h
            ){
                console.log(this.type + ' collides with ' + obj.type);
                return true;
            }
    }   
    // once again returning type as a string "player"
    get type() {
        return "player";
    }
    // expanding the possible keys. each key in wasd corresponds to a different motion. w is up, a is left, etc. 
    input() {
        if ('w' in keysDown) {
            this.dy = -1;
            this.dx = 0;
            // console.log("dy is: " + this.dy)
            this.y -= this.speed;
        }
        if ('a' in keysDown) {
            this.dx = -1;
            this.dy = 0;
            // console.log("dx is: " + this.dx)
            this.x -= this.speed;
        }
        if ('s' in keysDown) {
            this.dy = 1;
            this.dx = 0;
            // console.log("dy is: " + this.dy)
            this.y += this.speed;

        }
        if ('d' in keysDown) {
            this.dx = 1;
            this.dy = 0;
            // console.log("dx is: " + this.dx)
            this.x += this.speed;
        }

    }
    // creating boundaries for the canvas. cant go too far down, right, etc. 
    update() {
        this.input();
        // this.y += Math.random()*5*this.speed;
        // console.log(this.x);
        if (this.x + this.w > WIDTH) {
            this.x = WIDTH - this.w;
        }
        if (this.y + this.h > HEIGHT){
            this.y = HEIGHT - this.h;
        }
        if(this.x <= 0){
            this.x = 0;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
        }

    };

// not important yet but same thing as player extends sprite pretty much 
class Enemy extends Player{
    constructor(x, y, speed, w, h, color, hitpoints){
        super(x, y, speed, w, h, color, hitpoints);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
    }

    get type(){
        return "enemy";
    }

}
// not important yet
let badguy = new Enemy();
console.log("here's the example of a sub-sub class " + badguy.type);
console.log("badguy stats " + badguy.speed);

// same as player extends sprite, but is the characteristics of the wall?
class Wall extends Sprite{
    constructor(x, y, w, h, color){
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    create(x, y, w, h, color) {
        return new Wall(x, y, w, h, color);
    }
    get type(){
        return "wall";
    }
}

// to represent the grid from earlier, each dot is an empty space while each hashtag is a wall
const levelChars = {
    ".": "empty",
    "#": Wall,
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

console.log("here's the grid...\n" + makeGrid(gamePlan, 22));
// there are two loops. for the loops dealing with x grid values, the character has a (x,y) value
// if the character has not reached the end of the line, then if it is a dot, its empty, if theres a hashtag, its a wal
// and then you keep pushing the square for every empty space (dot)
function readLevel(grid) {
    let startActors = [];
    // note the change from i to x and y
    for (y in grid) {
        for (x in grid[y]) {
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
                } else {
                    let t = new type;
                    // let id = Math.floor(100*Math.random());
                    /*  Here we can use the x and y values from reading the grid, 
                        then adjust them based on the tilesize
                         */
                    startActors.push(t.create(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE, 'red'))
                }
            }
        }
    }
    return startActors;
}


let currentLevel = readLevel(makeGrid(gamePlan, 22))
console.log('current level');
console.log(currentLevel);

// instantiations. creating the characteristics of each square on the screen. width, height, etc. 
let player1 = new Player(WIDTH / 2, HEIGHT / 2, 10, TILESIZE, TILESIZE, 'rgb(100, 100, 100)', 100);
// let oneSquare = new Square("Bob", 10, 10, 1, 50, 50, 'rgb(200, 100, 200)');
// let twoSquare = new Square("Chuck", 60, 60, 5, 100, 100, 'rgb(200, 200, 0)');
// let threeSquare = new Square("Bill", 70, 70, 3, 25, 25, 'rgb(100, 100, 222)');

console.log(allSprites);
console.log(walls);

// update on actions after movement 
function update() {
    for (i of allSprites) {
        if (i.type == "wall") {
            // console.log(i)
            // you no longer can go through the walls, there is an actual collision effect. 
            if (player1.collideWith(i)) {
                if(player1.dx == 1){
                    player1.x = i.x - player1.w;   
                }
                else if(player1.dx == -1){
                    player1.x = i.x + i.w; 
                }
                else if(player1.dy == 1){
                    player1.y = i.y - player1.h;
                }
                else if(player1.dy == -1){
                    player1.y = i.y + i.h;
                }
                // console.log("player collided with walls")
                console.log("player1 dx is:" + player1.dx);
                
            }
        }
    }

    player1.update();

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