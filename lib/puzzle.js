// We need lodash for these jobs!
var _ = require('lodash');
var printf = require('printf');
var colors = require('colors');
var Tile = require('./tile.js').Tile;

/** Tests that the given (flattened) array is a solution
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
      preview += printf("% 5s", val); 
      preview += "\r\n";
    } else {
      if(val == null){
       preview += printf("% 5s", val).red + " |"; 
      } else {
        preview += printf("% 5s", val) + " |";
      }
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
  })
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
  _.each(grid, function(val,idx){
    var found = _.findIndex(val,function(v){
      return v == null; 
    });
    if(found > -1) {
      ret = new Tile(idx,found);
      return false;
    }
  });
  return ret;
}

/**
 * Finds all of the tiles around the empty tile that are able to be moved
 * @param the current state of the grid as represented by a two dimensional array
 * @param the coordinates of the empty tile { row:0, column:0 }
 * @returns an array of Tile objects
 */
exports.findNeighbors = function(grid){
  var neighbors = []; 
  var emptyTile = exports.findEmpty(grid);
  
  if(!_.isUndefined(grid[emptyTile.row-1])) {
    neighbors.push(new Tile(emptyTile.row-1,emptyTile.column));
  }
  
  if(!_.isUndefined(grid[emptyTile.row+1])){
    neighbors.push(new Tile(emptyTile.row+1,emptyTile.column));
  }

  if(!_.isUndefined(grid[emptyTile.column-1])){
    neighbors.push(new Tile(emptyTile.row,emptyTile.column-1));
  }
  
  if(!_.isUndefined(grid[emptyTile.column+1])){
   neighbors.push(new Tile(emptyTile.row,emptyTile.column+1));
  }

  

  return neighbors;
}

/**
 * Determines if the given coordinate is a neighbor of the empty tile
 * @param the current state of the puzzle as a 2 dimensional array
 * @param the coordinate to check
 * @return true if coordinate is a neighbor, false otherwise
 */
exports.isNeighbor = function(grid, coordinate){
  var neighbor = false; 
  var neighbors = exports.findNeighbors(grid);
  _.each(neighbors, function(val,idx){
    if(coordinate.row === val.row && coordinate.column === val.column){
      neighbor = true;
      return false;
    }
  }); 
  return neighbor;
}


/**
 * Move the tile to to the empty spot
 * @param the current state of the grid as a two dimensional array
 * @param the Tile to move
 * @return false if the move failed. If successful, return an object {grid: 'the new grid', coordinate, 'the new coordinate that includes the move in it's array'}
 */
exports.moveTile = function(grid, coordinate){
  // is the tile a neigbor of the empty?
  if(!exports.isNeighbor(grid,coordinate)){
    return false;
  }
  
  var emptyTile = exports.findEmpty(grid); 
  
  // don't move to the last position that the Tile was at
  if(coordinate.lastPosition[0] === emptyTile.row && coordinate.lastPosition[1] === emptyTile.column){
    console.log("not moving to this position due because the tile was just there!");
    return false;
  }

  var newGrid = _.clone(grid, true);
  newGrid[emptyTile.row][emptyTile.column] = newGrid[coordinate.row][coordinate.column];
  newGrid[coordinate.row][coordinate.column] = null;
  coordinate.addMove([coordinate.column,coordinate.row]); 
  coordinate.move(emptyTile.row, emptyTile.column);
  return { 'grid': newGrid, 'coordinate': coordinate }
}


