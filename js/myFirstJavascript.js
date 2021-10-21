// only javascript goes here, not html 
console.log("this is coming from a seperate file");
// letting a variable equal the value 5
let myVar = 5;
// this message will show up in the console of the webpage
console.log("my first console message");
console.log(myVar);

// These are the variables for various aspects, such as the height and width of the squares. Player 2 stays in same location.
let playing = true;
let width = 400;
let height = 200;
var player1 = "Tome";
const player2 = "Tryo";

// for any integer less than 10, console log an integer between 1-10 
for (i=0; i<10; i++){
    console.log(i); 
}
// new function for drawing the squares
function draw(){
// variable that allows the code to look for an  element in the html document with an id of 'canvas'
    var canvas = document.getElementById('canvas');
    if (canvas.getContext){
        // This makes the square 2d
        var ctx = canvas.getContext('2d');

        // Establishes the color of the first square and its size
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, width, height);

        // Establishes the color of the second square and its size
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);
        
    }
}
// draw the squares
draw();