document.addEventListener('DOMContentLoaded', startGame);

var board = { cells: [ ] };

// Check user's grid size is OK
function checkInput(){

  //Collect grid-size data from text input
  var gridSize = document.getElementById("grid-input").value;

  //If element is a number then proceed.
  if (gridSize !== NaN){
  //If input is greater than 0, and less than 100, create grid.
      if (gridSize > 4 && gridSize < 30){
        alert("Thank you!");
        document.getElementById("board").innerHTML = createGrid();
      }
      else {
        alert("Grid-size must be between 4 and 30!")
      };
  }
  else {
    alert("Sorry, your input must be a number.")
  }
};


// Create grid with size based on gridSize input
var createGrid(gridSize){

      var countCol = 0;
      var countRow = 0;

      for(var i = 0; countRow < gridSize; i++) {
        for(var i = 0; countCol < gridSize; i++){
          board.cells.push(
            {
              row: countRow, col: countCol, isMine: Math.random() >= 0.2, isMarked: false, hidden: true
            }
          );
          countCol = countCol + 1;
        }
        countCol = 0;
        countRow = countRow + 1;
      }
    };


  /*  var rowNumber = 1;
    var rowCount = 1;
    var colNumber = 1;
    var colCount = 1;

    for (var a = 0; a < gridSize; a++){
      //Create Board object
        board.cells[a] = new Object();

      // Set all cells to HIDDDEN
        board.cells[a].hidden = true;

    //Create rows
    if (rowCount <= gridSize){
      board.cells[a].row = rowNumber;
      rowCount++;
    }

    //If number of rows is greater than gridSize then reset rows to 1
    if (rowCount >= gridSize){
      rowNumber++;
      rowCount = 1;
    }

    //Create columns and add 1 to column counter
    if (colCount <= gridSize){
      board.cells[a].col = colNumber;
      colCount++;
    }

    //If number of columns is greater than gridSize then reset columns to 1
    if (colCount >= gridSize){
      colNumber++;
      colCount = 1;
    }

} */





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


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForWin () {
  for( i = 0; i < board.cells.length; i++){
    if(board.cells[i].isMine === true && board.cells[i].isMarked !== true) {
      return;
    }
    else if(board.cells[i].isMine !== true && board.cells[i].hidden === true){
      return;
    }
  }
  lib.displayMessage('You win!')
}



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
