var http = require('http');  
/**
 * Fetch a puzzle based on the parameters
 * 
 * @param size - the size of the grid
 * @param difficulty - the difficulty of the puzzle
 * @param callback - a function that takes the http response
 */
exports.fetchPuzzle = function(size,difficulty, callback){
  var path = 'http://codetest.zipscene.com/puzzle?size=' + size + '&difficulty='+ difficulty;
  if(typeof id !== "undefined"){
    path += '&id=' + id;
  }
  http.get(path,callback); 
}

exports.verifyPuzzle = function(size,difficulty,id, jsonBody, callback){
  var options = {
    hostname : 'codetest.zipscene.com',
    path     : '/verify?size=' + size + '&id=' + id + '&difficulty=' + difficulty,
    port     : 80,
    method   : 'POST',
    headers : {
      'Content-Type': 'application/json',
      'Content-Length' : jsonBody.length 
    }
  };
  var req = http.request(options,callback);
  req.write(jsonBody);
  req.end();
}
