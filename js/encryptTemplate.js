// Comment pseudocode up here 
// Objective: take a message from a user and encrypt it
// Then using the cypher decrypt it
/* 
1. get input from user
2. Encrypt the message
3. Take the encrypted message and put it back in the word boz
4. Decrypt the message
*/


// global variables go to the top
let Symbols = ["!","@","#","<","*",")", ":", ";","&", "%","$","_","-", "{", "}", "|", "^", "`", "]", "[", ".", ",", "+", "=", "'", "~", "?"];
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "];
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
    return Symbols[index]; 
}
// Find the indext of the symbol and then input the index in the letters array and then return a word 
function getLetters(symbol) {
    let index = Symbols.indexOf(symbol);
    return Letters[index];
}

function computeScore(word)
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
// by using the index and using the for loop to link each symbol to a word, the word is computed
function computeWord(symbol)
{
    let word = 0;
    for (i=0, n = symbol.length; i < n; i++){
        console.log("letter score is " + getLetters(symbol[i]));
        word += getLetters(symbol[i]);  
        console.log("final score is" + word);
    }
    return word;
}
// // find the score of the word hello
computeScore("hello");

// scope; inputVal cannot escape getInputValue
 
// get the value of inputId
function getInputValue(){
    return document.getElementById("inputId").value;
}
// runs the computeScore function and returns a value in score 
function encrypt(){
    let score = computeScore(getInputValue())
    output("The encrypted message is ... drumroll please:  " + score );
}

// decrypt the message by running the computeWord function and returning a value for a word
function decrypt(){
    let word = computeWord(getInputValue())
    output("This is the decrypted message, congrats! " + word);
}

// you put in the input in the type box and get an output
function output(content){    
    document.getElementById("display").innerHTML = content;
}

