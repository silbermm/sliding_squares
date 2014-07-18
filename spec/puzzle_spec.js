var puzzle = require("../lib/puzzle.js");
var printf = require('printf');
describe("solution", function(){
  it("should be true", function(){
    var s = [0,1,2,3,4,5,6,null];
    var isTrue = puzzle.isSolution(s);
    expect(isTrue).toBe(true);
  });

  it("should be false", function(){
    var s = [null, 1,2,3,4];
    var isTrue = puzzle.isSolution(s);
    expect(isTrue).toBe(false);
  });
});

describe("preview", function(){
  it("should be pretty", function(){
    var s = [0,1,2,3,4,5,6,7,null]
    var pretty = '    0 |    1 |    2\r\n    3 |    4 |    5\r\n    6 |    7 | null\r\n'
    expect(puzzle.buildPreview(s,3)).toBe(pretty);
  });
});

describe("2dArray", function(){
  it("should generate 2d array", function(){
    var s = [0,1,2,3,4,5,6,7,null];
    var twoD = [ [0,1,2],[3,4,5],[6,7,null] ];
    expect(puzzle.build2dArray(s,3)).toEqual(twoD);
  });
});

describe("Get Tile", function(){
  it("should be get correct tile", function(){
    var twoD = [ [0,1,2],[3,4,5],[6,7,null] ];
    expect(puzzle.getTile(twoD, 1, 2)).toBe(5);
  });

  it("should be false when row is to large", function(){
    var twoD = [ [0,1,2],[3,4,5],[6,7,null] ];
    expect(puzzle.getTile(twoD, 3, 0)).toBe(false);
  });

  it("should be false when column is to large", function(){
    var twoD = [ [0,1,2],[3,4,5],[6,7,null] ];
    expect(puzzle.getTile(twoD, 0,3)).toBe(false);
  });
});

describe("Find empty", function(){
  it("should find index of the empty tile", function(){ 
    var twoD = [ [0,1,2],[3,4,null],[5,6,7] ];
    var coordinates = puzzle.findEmpty(twoD); 
    expect(coordinates.row).toBe(1);
    expect(coordinates.column).toBe(2);
  });

  describe("Find Neighbors", function(){
    it("should find 4",function(){
      var twoD = [ [0,1,2],[3,null,4],[5,6,7] ];
      var emptyT = puzzle.findEmpty(twoD);
      var neighbors = puzzle.findNeighbors(twoD,emptyT);
      expect(neighbors.length).toBe(4);
    });
  });




});

