// We need lodash for these jobs!
var _ = require('lodash');
/**
 * Tests that the given (flattened) array is a solution
 *
 * @param cells - the array to test 
 * @param true if this is a solution, false otherwise
 */
exports.isSolution = function (cells){
  var correct = _.times(cells.length-1, function(n){ return n; });
  correct.push(null);
  for(var i=0; i < correct.length; i++){
    if(correct[i] !== cells[i]){ 
      return false;
    }
  }
  return true;
}

/**
 * Builds a nice representation of the puzzle 
 * suitable for displaying on the terminal
 *
 * @param cells - the flattened array of cells
 * @param width - the width (or height) of the puzzle
 * @returns a string suitable for printing that represents the puzzle
 */
exports.buildPreview = function (cells, width){
  var preview = ""; 
  _.each(cells, function(val,idx){
    var iter = idx + 1; 
    if(iter % width === 0){
      preview += val; 
      preview += "\r\n";
    } else {
      preview += val + " | ";
    }
  });
  return preview;
}

/**
 * Builds a two-dimensional array based on the original cells and 
 * size of the grid
 *
 * @param cells - the flattened grid
 * @param width - the width(or height) of the grid
 * @returns a two dimensional array
 */
exports.build2dArray = function(cells, width){
  var grid = [];
  var line = [];
  _.each(cells, function(val,idx){
    var iter = idx +1;
    if(iter % width === 0){
      line.push(val);
      grid.push(line);
      line = [];
    } else {
      line.push(val); 
    }
  });
  return grid;
}

/**
 * Get a tile a specific location in the 2d array
 *
 * @param grid - the two-dimensional representation of the puzzle
 * @param row  - the 'row' that the tile is in
 * @param column - the 'column' that the tile is in
 * @return - the value of the tile at the specified row , column
 */
exports.getTile = function(grid, row, column){
  var expectedGridLength = grid.length -1;
  if(row > expectedGridLength || column > expectedGridLength){
    return false;
  }
  return grid[row][column];
}

/**
 * Find the corrdinates of the empty tile in the 2d array
 *
 * @param the 2d array that represents the current state of the puzzle
 * @return an object with the row and column i.e. {row: 0, column: 1}
 */
exports.findEmpty = function(grid){
  var ret = {};
  _.each(grid,function(val,idx){
    var found = _.findIndex(val,function(v){
      return v == null; 
    });
    if(found > -1) {
      ret = new Coordinates(idx,found);
      return false;
    }
  });
  return ret;
}

/**
 * Finds all of the tiles around the empty tile that are able to be moved
 *
 * @param the current state of the grid as represented by a two dimensional array
 * @param the coordinates of the empty tile { row:0, column:0 }
 * @returns an array of Coordinate objects
 */
exports.findNeighbors = function(grid, emptyTile){
  return true;
}

/**
 *
 */
exports.moveTile = function(grid, tileToMove){
  return true;
}

/**
 * Class to hold coordinates of a tile
 */
function Coordinates(row, column){
  this.row = row;
  this.column = column;
}
