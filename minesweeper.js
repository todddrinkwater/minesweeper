document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    {
    row: 1,
    col: 1,
    isMine: false,
    hidden: true
  }, {
    row: 1,
    col: 2,
    isMine: true,
    hidden: true
  }, {
    row: 1,
    col: 3,
    isMine:true,
    hidden: true
  }, {
    row: 2,
    col: 1,
    isMine:true,
    hidden: true
  },
  {
   row: 2,
   col: 2,
   isMine:false,
   hidden: true
 },
 {
  row: 2,
  col: 3,
  isMine:true,
  hidden: true
},
{
 row: 3,
 col: 1,
 isMine:true,
 hidden: true
}, {
  row: 3,
  col: 2,
  isMine:false,
  hidden: true
}, {
  row: 3,
  col: 3,
  isMine:true,
  hidden: true
},

],

};


function startGame () {
  for (var i = 0; i < board.cells.length; i++){
        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()

  document.addEventListener("contextmenu", function(){
    checkForWin();
  });
  document.addEventListener("click", function(){
    checkForWin();
  });
};
/*
var markAndMine = function() {
  for (var k = 0; k < board.cells.length; k++){
    if (board.cells[k].isMine === true && board.cells[k].isMarked === false){
      return;
    }
    else {
      return true;
    }
  }
}


var markAndHidden = function() {
  for(var l = 0; l < board.cells.length; l++){
    if (board.cells[l].isMarked === true && board.cells[l].hidden === false){
      return;
    }
    else {
      return true;
    }
  }
}
*/

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  var numOfMines = 0;
  var minesFound = 0;
  var incorrectMine = 0;
  var cellsRemaining = 0;

// Count number of mines on board
function mineCount(){
  for (var a = 0; a < board.cells.length; a++){
    if(board.cells[a].isMine === true){
      numOfMines += 1;
    }
  }
};

// Count number of mines found/flagged

function findMine(){
  for (var b = 0; b < board.cells.length; b++){
    if((board.cells[b].isMine === true) && (board.cells[b].isMarked === true)){
      minesFound += 1;
    }
  }
};

// Count number of mines that are incorrectly flagged

function incorrectFlag(){
  for (var c = 0; c < board.cells.length; c++){
    if((board.cells[c].isMine === false) && (board.cells[c].isMarked === true)){
      incorrectMine += 1;
    }
  }
};

// Count the number of cells that haven't been clicked

function checkHiddenCells(){
  for (var d = 0; d < board.cells.length; d++){
    if(board.cells[d].hidden === true){
      cellsRemaining += 1;
    }
  }
};

mineCount();
findMine();
incorrectFlag();
checkHiddenCells();

if( (numOfMines === minesFound) && (incorrectMine === 0) &&  (cellsRemaining === 0) ){
    lib.displayMessage('You win!')
  }
};

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.



function countSurroundingMines (cell) {
  var count = 0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  for (j = 0; j < surrounding.length; j++){
    if (surrounding[j].isMine){
      count += 1;
    }
  }
  return count;
};


    /* console.log(surrounding);
    surrounding.forEach(function(cells){
      if(board.cells.isMine){
        count++;
      }
    })

  return count;
}; */
