// We need lodash for these jobs!
var _ = require('lodash');
var printf = require('printf');
var colors = require('colors');
var Tile = require('./tile.js').Tile;
/**
 * Represents a Grid
 */
exports.Grid = function Grid(cells, width){  
  this.cells = cells;
  this.width = width;
  this.grid = [];
  this.moves = [];
  this.lastMove = new Tile(-1,-1); 


  this.setup = function(){
    var grid = [];
    var line = [];
    _.each(this.cells, function(val,idx){
      var iter = idx +1;
      if(iter % width === 0){
        line.push(val);
        grid.push(line);
        line = [];
      } else {
        line.push(val); 
      }
    })
    this.grid = grid;
  }

  /** Tests that the current array is a solution
   *
   * @param cells - the array to test 
   * @param true if this is a solution, false otherwise
   */
  this.isSolution = function(){
    var correct = _.times(this.cells.length-1, function(n){ return n; });
    correct.push(null);
    for(var i=0; i < correct.length; i++){
      if(correct[i] !== this.cells[i]){ 
        return false;
      }
    }
    return true;
  }

  /**
   * Determines if this grid is equal to another grid
   */
  this.isEqual = function(otherGrid){
    for(var i=0; i<otherGrid.cells.length; i++){
      if(this.cells[i] !== otherGrid.cells[i]){
        return false;
      }
    }
    return true;
  }

  /**
   * Builds a nice representation of the puzzle 
   * suitable for displaying on the terminal
   *
   * @returns a string suitable for printing that represents the puzzle
   */
  this.prettyPrint = function(){
    var preview = ""; 
    _.each(this.cells, function(val,idx){
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
   * Find the corrdinates of the empty tile in the 2d array
   *
   * @return an object with the row and column i.e. {row: 0, column: 1}
   */
  this.getEmpty = function(){
    var ret = {};
    _.each(this.grid, function(val,idx){
      var found = _.findIndex(val,function(v){
        return v == null; 
      });
      if(found > -1) {
        ret = new Tile(idx,found);
        return false;
      }
    });
    return ret;
  };

  /**
   * Finds all of the tiles around the empty tile that are able to be moved
   * @returns an array of Tile objects
   */
  this.findNeighbors = function(){
    var neighbors = []; 
    var emptyTile = this.getEmpty();
    
    if(!_.isUndefined(this.grid[emptyTile.row-1])) {
      neighbors.push(new Tile(emptyTile.row-1,emptyTile.column));
    }
    
    if(!_.isUndefined(this.grid[emptyTile.row+1])){
      neighbors.push(new Tile(emptyTile.row+1,emptyTile.column));
    }

    if(!_.isUndefined(this.grid[emptyTile.column-1])){
      neighbors.push(new Tile(emptyTile.row,emptyTile.column-1));
    }
    
    if(!_.isUndefined(this.grid[emptyTile.column+1])){
     neighbors.push(new Tile(emptyTile.row,emptyTile.column+1));
    }
    return neighbors;
  } 


  /**
   * Determines if the given coordinate is a neighbor of the empty tile
   * @param the coordinate to check
   * @return true if coordinate is a neighbor, false otherwise
   */
  this.isNeighbor = function(coordinate){
    var neighbor = false; 
    var neighbors = this.findNeighbors(this.grid);
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
   * @return false if the move failed. If successful, return an object {grid: 'the new grid', coordinate, 'the new tile'}
   */
  this.moveTile = function(tile){
    // is the tile a neigbor of the empty?
    if(!this.isNeighbor(tile)){
      return false;
    }
    
    var emptyTile = this.getEmpty(); 
    // don't move to the last position that the Tile was at 
    if(this.lastMove.row === tile.row && 
       this.lastMove.column === tile.column
      ){
      console.log("not moving to this position due because the tile was just there!");
      return false;
    }

    this.grid[emptyTile.row][emptyTile.column] = this.grid[tile.row][tile.column];
    this.grid[tile.row][tile.column] = null; 
    this.cells = _.flatten(this.grid);
    this.lastMove = new Tile(tile.row,tile.column);
    this.moves.push([tile.column,tile.row]);
    return this;
  }
}

