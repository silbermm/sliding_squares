// solver.js

var cli = require("./lib/cli_parser.js");
var http_puzzle = require("./lib/http_puzzle.js");
var puzzle = require("./lib/puzzle.js");
var _ = require('lodash');
var printf = require('printf');

var cliData = cli.parseCli(process.argv);
http_puzzle.fetchPuzzle(cliData.size, cliData.difficulty, function(response){     
  var res_data = '';     
  response.on('data', function(chunk) {
    res_data += chunk;
  });
  response.on('end', function() {
    var resp = JSON.parse(res_data); 
    
    var preview = puzzle.buildPreview(resp.grid,resp.width);
    console.log(preview);
    
    var grid = puzzle.build2dArray(resp.grid,resp.width);
 
    var coord = puzzle.findEmpty(grid);
    console.log("empty is at: " + coord.row + ", " + coord.column);
     
  
  });
});



