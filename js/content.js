/*
File: content.html
Created: 12/17/2023
GUI Assignment: Assignment 5
Sources: 
    https://jqueryui.com/
    https://stackoverflow.com/questions/12349053/jquery-ui-on-drop-attach-the-div-to-its-droppable-target
    https://stackoverflow.com/questions/18294487/jquery-ui-drag-drop-snap-to-bottom
    https://jqueryui.com/draggable/
    https://api.jqueryui.com/droppable/
    https://stackoverflow.com/questions/1162487/using-jquery-ui-drag-and-drop-changing-the-dragged-element-on-drop
    https://stackoverflow.com/questions/8097926/jquery-ui-prevent-draggable-to-be-dropped-on-another-inside-a-droppable-div

Copyright (c) 2023 by ThienTran. All rights reserved. 
May be freely copied/excerpted for educational purposes 
with credit to the author.

Updated by TL on 12/17/2023
*/

// var ScrabbleTiles is all from provided code in assignment, documentation is below
/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely 
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

// some global variables 
const MAX_AMOUNT_OF_TILES_PER_ROUND = 7;
const BOARD_TILE_LIMIT = 15;

let boardTemplate = [];
let displayTiles = "";
let sum = 0;
let used = 0;
let tileAmt = 0;
let roundSum = 0;
let score = [];
let tileLetters = [];
let indexList = [];
let tmp = [];
let boardTmp = boardTemplate;

// The dictionary lookup object
// Could not get this to work so I did a basic one where it has 7 words to test against :(
let dict = ['what', 'is', 'life', 'right', 'now', 'cry', 'smile'];

$(document).ready(function () {
    for (let i = 0; i < BOARD_TILE_LIMIT; i++) {
        boardTemplate.push('?');
    }

    totalAmount();
    generateTiles();
    dragTiles();
    dropTiles();
})

// Gives me the total amount of tiles left remaining
function totalAmount() {
    for (let i = 0; i < ScrabbleTiles.length; i++) {
        tileAmt += ScrabbleTiles[i].amount;
    }

    return tileAmt;
}

function generateTiles() { 
    for (let i = 0; i < MAX_AMOUNT_OF_TILES_PER_ROUND; i++) {
        let index = Math.floor(Math.random() * ScrabbleTiles.length);
        while (ScrabbleTiles[index].amount === 0) {
            index = Math.floor(Math.random() * ScrabbleTiles.length);
        }

        let letter = ScrabbleTiles[index].letter;
        let value = ScrabbleTiles[index].value;

        tileLetters.push(letter);
        score.push(value);
        tmp.push(value);

        displayTiles += "<img id=tile_" + i + " class=board_tiles" + 
                        " src=graphics_data/Scrabble_Tiles/Scrabble_Tile_"
                        + letter + ".jpg></img>";

        ScrabbleTiles[index].amount--;
    }

    $("#scoreNum").html(0); 
    $("#currNum").html(0);
    $("#tileNum").html(tileAmt);
    $("#tileSlots").html(displayTiles);

    generateRow();
}

// generates drop tile lines for the single board line
function generateRow() {
    let scrabbleBoard = "<table>";
    scrabbleBoard += "<tr>";
    for (let i = 0; i < BOARD_TILE_LIMIT; i++) {
        if (i === 2 || i === 12) {
            scrabbleBoard += "<td class='double_word drop_letter' id=" + i + "></td>";
        } else if (i === 6 || i === 8) {
            scrabbleBoard += "<td class='double_letter drop_letter' id=" + i + "></td>";
        } else {
            scrabbleBoard += "<td class='drop_letter' id=" + i + "></td>";
        }
    }
    scrabbleBoard += "</tr>";
    scrabbleBoard += "</table>";

    $(".drop-tiles").html(scrabbleBoard);
}

function dragTiles() {
    // {revert: "invalid"} causes it to not move outside droppable target
    for (let i = 0; i < MAX_AMOUNT_OF_TILES_PER_ROUND; i++) {
        $("#tile_" + i).draggable ({revert: 'invalid'});
    }
}

function dropTiles() {
    $(".drop_letter").droppable({
        drop: function (e, ui) {
            $(this).droppable('option', 'accept', ui.draggable);
            // drop target takes only one drag target
            if ($(this).hasClass('drop_letter')) {
                console.log("ID-> " + id);
                let index = id.substr(id.length - 1);
                let dropID = $(this).attr("id"); // ID of current drop target

                let tileType = "";

                ui.draggable.addClass('used');

                boardTemplate[dropID] = tileLetters[index];

                let num = score[index];
                if ($(this).hasClass('double_letter')) {
                    num += score[index];
                    tileType = "double_letter";
                } else if ($(this).hasClass('double_word')) {
                    roundSum = roundSum * 2;
                    num = num * 2;
                    for (let i = 0; i < MAX_AMOUNT_OF_TILES_PER_ROUND; i++) {
                        score[i] = score[i] * 2;
                    }
                    tileType = "double_word";
                } else {
                    tileType = "normal";
                }

                roundSum += num;

                $("#currNum").html(roundSum);

                $("#lettersPlayed").html("You played " + tileLetters[index] + " on " + "board_tile_" +
                $(this).attr("id") + ", a " + tileType + " tile.");

                indexList.push(index);
                used++; // variables to keep track on how many tiles I used in this round
                tileAmt--; // and how many I have left in stock

                $("#tileNum").html(tileAmt);
            }
            $(this).draggable('disable'); // drag target not movable once in drop target
        }
    });
}

function validate() {
    // get rids of all the '?' so I can get a string/word from it
    const str = boardTemplate.filter(x => x !== '?');
    let s = str.join("");
    s = s.toLowerCase();

    console.log(s);
    console.log(dict);

    if (dict.includes(s)) {
        $("#msg").html("<p> Good Job! " + s + " is a word that exists.</p>");
    } else {
        console.log("Not an existing word");
    }
}

function restart() {
    $(".board_tiles").remove(); // Remove / destroy all the current tiles on the screen

    score = [];
    tileLetters = [];
    indexList = [];
    tmp = [];
    displayTiles = "";
    sum = 0;
    roundSum = 0;

    // Reset all tiles back to their original amounts
    for (let i = 0; i < ScrabbleTiles.length; i++) {
        ScrabbleTiles[i].amount = ScrabbleTiles[i].original;
    }
    tileAmt = 100;

    generateTiles(); // Generate new tiles and make them draggable and reset score to 0
    dragTiles();
    dropTiles();
    $("#scoreNum").html(0);
    $("#currNum").html(0);
}

function contin() {
    console.log(tileAmt)
    validate();

    sum += roundSum;
    console.log("Sum: " + sum);
    console.log("RoundSum: " + roundSum);

    $("#scoreNum").html(sum); // Updates the total score
    $("#currNum").html(0); // Updates the current score

    roundSum = 0;

    console.log(tileLetters);
    console.log(score);

    // Reset the score_values to their original vals after double word and letter calcs
    for (let i = 0; i < MAX_AMOUNT_OF_TILES_PER_ROUND; i++) {
        score[i] = tmp[i];
    }

    if (tileAmt <= 0) { // If theres no tiles remaining we return from here and console.log("smth")
        console.log("No more tiles left")
        return false;
    }

    // Replaces the old tiles used with new ones
    for (let i = 0; i < used; i++) {
        let element = indexList[i];

        let index = Math.floor(Math.random() * ScrabbleTiles.length);

        while (ScrabbleTiles[index].amount === 0) {
            index = Math.floor(Math.random() * ScrabbleTiles.length);
        }

        let letter = ScrabbleTiles[index].letter;
        let value = ScrabbleTiles[index].value;

        tileLetters.splice(element, 1, letter);
        score.splice(element, 1, value);

        ScrabbleTiles[index].amount--;
    }

    console.log(tileLetters);
    console.log(score);

    displayTiles = "";
    indexList = [];
    used = 0;

    // Clears the board and set the new and unused tiles back to the tile holder
    for (let i = 0; i < MAX_AMOUNT_OF_TILES_PER_ROUND; i++) {
        displayTiles += "<img id=tile_" + i + " class=board_tiles" + 
                        " src=graphics_data/Scrabble_Tiles/Scrabble_Tile_" 
                        + tileLetters[i] + ".jpg></img>";
        tmp[i] = score[i];
    }

    console.log(tileLetters);
    console.log(score);

    $("#tileSlots").html(displayTiles);
    generateRow();
    dragTiles();
    dropTiles();
}
