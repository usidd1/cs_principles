// global variables go to the top
let POINTS = [1,3,3,2,1,4,2, 4, 1,8, 5,1,3,1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let player1score = 0;
let player2score = 0;

// utility functions 
// chech if the letter is upper case
function isupper(str){
    return str === str.toUpperCase();
}
// check if the letter is lower case
function islower(str){
    return str === str.toLowerCase();
}

// Find the index of the letter and then input the index in the points array and return a value (integer)
function getPoints(letter) {
    let index = Letters.indexOf(letter);
    return POINTS[index]; 
}


console.log("testing index" + Letters.indexOf("c"));

// adding the x and y variable. will show 6 and then 11 (5+6)
function add(x,y){
    let sum = x + y
    let string = '$(sum)';
    console.log(string.length);
    console.log("the sum is", sum);
}
add (5,6);

function compute_score(word)
{
    let score = 0;
    for (i = 0, n = word.length; i < n; i++){
    // for loop calculates the score by going through each letter individually and then adding up the score
        // if (islower(word[i])){
        //     console.log(word[i] + "this is lower case");
        // }
        // if (isupper(word[i])){
        //     console.log(word[i] + "this is upper case");
        // }
        console.log("letter is" + (word[i]));
        console.log("letter score is " + getPoints(word[i].toLowerCase()));
        score += getPoints(word[i].toLowerCase());  
        console.log("final score is" + score);
    }
    return score;
}
// // find the score of the word hello
// computeScore("hello");

// scope; inputVal cannot escape getInputValue
 
// get the value of inputId
function getInputValue(){
    return document.getElementById("inputId").value;
}
// runs the computeScore function and returns a value in score 
function doSomething(){
    let score = computeScore(getInputValue())
    output("you scored " + "points.");
}

// you put in the input in the type box and get an output
function output(){    
    document.getElementById("display").innerHTML = content;
}


