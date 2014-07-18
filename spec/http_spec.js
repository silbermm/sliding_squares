var solver = require("../lib/http_puzzle.js");

describe("fetchPuzzle", function(){
  it("should return 200", function(){
    
    var statusCode = 0; 
    solver.fetchPuzzle(3,8,function(res){
      var res_data = '';
      response.on('data',function(chunk){
        res_data += chunk;
      });
      expect(res.statusCode).toBe(200); 
    }); 
  });
});
