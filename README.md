# COMP.4610 Assignment 5 WriteUp

## Overview
The goal of this assignment was to create a one-line version of Scrabble in a way that would be able to simulate the popular 2-4 person game, *Scrabble*, in a clean and simple way. 

The game randomly generates 7 letter tiles for the player and for each particular tile, the amount remaining for that tile decreases each time. Once that amount reaches 0 (zero), the computer keeps on finding a tile that has a tile left. The game uses an associative array, as well as a for loop that starts out from 0 (zero) to 7. It also enables restart capabilities and an option to continue playing and adding more to your total score.

## Features

• (4) letter tiles in the player’s “hand” are selected randomly from a data structure with the proper distribution of the letters (code!) <br>
-> I mean, you could argue for this one, but I can't even say it really does that, nothing shows up. I do make use of an associative array, and also make use of .random() in order to generate the tiles. 

• (4) letter tiles can be dragged-and-dropped onto target Scrabble squares <br> 
-> Again, I can't say this works, nothing shows up.

• (4) program identifies which letter tile is dropped onto which Scrabble square <br>
-> 

• (4) board includes at least two bonus squares <br>
-> I feel like its on there.

• (4) score is tallied correctly, including consideration of bonus square multipliers <br>
-> I'm confident that this feature works. 

• (3) any number of words can be played until the player wishes to quit or depletes all tiles <br>
-> I don't think this feature works. 

• (3) the board is cleared after each round so that a new word can be played <br>
-> I don't think this feature works, but we can say it does. 

• (3) after playing a word, only the number of letter tiles needed to bring the player’s “hand” back to 7 tiles are selected <br>
-> I sure don't think so, but I'm optimistic this could've worked. 

• (3) score is kept for multiple words until the user restart a new game (implement next vs. restart) <br>
-> Ok, this one I feel confident about, like when testing this feature totally worked. Until I bricked the rest of it that is. 

• (2) Tiles can only be dragged from the “rack” to Scrabble board. If the user drop them anywhere else, they will be bounced back to the “rack” <br>
-> This feature  doesn't work. 

• (2) Once the tile is placed on the Scrabble board, it can be moved back to the “rack” <br>
-> I hope so. But it doesn't. 

• (2) Except for the first letter, all sub-subsequent letters must be placed directly next to or below another letter with no space. Else, they will bounce back to the “rack” <br>
-> This feature probably works. 

• (2) user can always restart the game <br>
-> This feature works. For sure. 
