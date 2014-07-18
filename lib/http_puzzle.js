/**
 * Fetch a puzzle based on the parameters
 * 
 * @param size - the size of the grid
 * @param difficulty - the difficulty of the puzzle
 * @param callback - a function that takes the http response
 */
exports.fetchPuzzle = function(size,difficulty, callback){
  var http = require('http');  
  var path = 'http://codetest.zipscene.com/puzzle?size=' + size + '&difficulty='+ difficulty;
  if(typeof id !== "undefined"){
    path += '&id=' + id;
  }
  http.get(path,callback); 
}
