// solver.js

var cli = require("./lib/cli_parser.js");
var http_puzzle = require("./lib/http_puzzle.js");
var _ = require('lodash');
var printf = require('printf');
var Grid = require('./lib/grid.js').Grid;
var width = 0;

var cliData = cli.parseCli(process.argv);
http_puzzle.fetchPuzzle(cliData.size, cliData.difficulty, function(response){     
  var res_data = '';     
  response.on('data', function(chunk) {
    res_data += chunk;
  });

  response.on('error', function(e){
    console.log(e);
  });

  response.on('end', function() {
    var resp = JSON.parse(res_data);  
    var grid = new Grid(resp.grid, resp.width);
    grid.setup();  
    console.log(grid.prettyPrint());
    var currentime = new Date().getTime();
    var solutionGrid = findSolution([grid]); 
    
    var finishtime = new Date().getTime() - currentime;
    console.log("Found a possible solution in " + finishtime + " milliseconds, verifing...");


   http_puzzle.verifyPuzzle(
       resp.width,
       cliData.difficulty,
       resp.id, 
       JSON.stringify(solutionGrid.moves),function(postResponse){
      var verifiedData = ''; 
      
      postResponse.on('error', function(e){
        console.log(e); 
      });

      postResponse.on('data',function(chunk){
        verifiedData += chunk;
      });
      
      postResponse.on('end',function(){
        var verifiedJson = JSON.parse(verifiedData);
        if(verifiedJson.valid === true){
          console.log("The solution was verified and consisted of " + solutionGrid.moves.length + ' moves.'); 
          console.log(solutionGrid.moves);
          console.log("\n");
          console.log(solutionGrid.prettyPrint()); 
        

        } else {
          console.log("unable to find and verifiy a solution.");
        }
      });
    });
    
  }); 
});



/**
 * Recursive function to find a solution!
 * @param an array of grids 
 */
var findSolution = function(grids){
  var solutionGrid = null;
  var gridA = [];
  _.each(grids,function(g){
    if(g.isSolution()){
      solutionGrid = g;
      return false;
    } 
    var neighbors = g.findNeighbors();
    _.each(neighbors, function(t){
      var newGrid = _.clone(g,true);
      newGrid.moveTile(t);
      gridA.push(newGrid);
    });
  }); 
  if(solutionGrid != null){
    return solutionGrid;
  }
  return findSolution(gridA);
}





