// solver.js

var cli = require("./lib/cli_parser.js");
var http_puzzle = require("./lib/http_puzzle.js");
var puzzle = require("./lib/puzzle.js");
var _ = require('lodash');
var printf = require('printf');
var Grid = require('./lib/tile.js').Grid;
var width = 0;

var cliData = cli.parseCli(process.argv);
http_puzzle.fetchPuzzle(cliData.size, cliData.difficulty, function(response){     
  var res_data = '';     
  response.on('data', function(chunk) {
    res_data += chunk;
  });
  response.on('end', function() {
    var resp = JSON.parse(res_data); 
   
    var grid = new Grid(resp.grid, resp.width);
    grid.setup;
  
    console.log(grid.prettyPrint());
 
    
    /*
    width = resp.width; 
    var cells = puzzle.build2dArray(resp.grid,resp.width);
    var neighbors = puzzle.findNeighbors(cells);
   

    var solution = []; 
    var solutionTile = findSolution([cells], solution);
 
    console.log("A solution was Found!");
    console.log(solutionTile);
    */
  });
});



/**
 * Recursive function to find a solution!
 * @param the current grid
 * @param an array of Tiles that should be moved
 */
var findSolution = function(grids, solution){
  var actualSolution = false;
  var gridA = [];
  _.each(grids,function(g){
    if(puzzle.isSolution(_.flatten(g))){
      actualSolution = true; 
      console.log(puzzle.buildPreview(_.flatten(g),width));
      return false;
    } 
    var neighbors = puzzle.findNeighbors(g);
    _.each(neighbors, function(t){
      var obj = puzzle.moveTile(g, t); 
      gridA.push(obj.grid);
      //console.log(obj.coordinate.moves);
    });
  }); 
  if(actualSolution){
    return solution;
  }
  return solution.push(findSolution(gridA, solution));
}





