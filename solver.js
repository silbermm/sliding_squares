// solver.js

/**
 * Parse the command line arguments
 * @return 
 */.
exports.parseCli = function(argv){
  var celeri = require('celeri');
  var cliData = null;
  celeri.option({
    command : 'solve :size :difficulty',
    description : "Solves the ZipScene code test for difficulty [difficulty]",
  }, function(data) {
    cliData = data;
  });

  celeri.parse(argv);
  if(cliData === null){
    console.error("Please specify the correct parameters.");
    process.exit(1);
  }
  return cliData;
}

/**
 * Fetch a puzzle based on the parameters
 */
exports.fetchPuzzle = function(size,difficulty,id){
  var http = require('http');  
   

  
  if(typeof id === "undefined"){
    
  }
}

var cliData = exports.parseCli(process.argv);

