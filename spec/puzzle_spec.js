var puzzle = require("../lib/puzzle.js");
var printf = require('printf');
var Tile = require("../lib/tile.js").Tile;
var Grid = require("../lib/tile.js").Grid;

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
});

describe("Find Neighbors", function(){
  it("should find 4",function(){
    var twoD = [ [0,1,2],[3,null,4],[5,6,7] ];
    var neighbors = puzzle.findNeighbors(twoD);
    expect(neighbors[0].row).toBe(0);
    expect(neighbors[1].row).toBe(2);
  });
});

describe("Is coordinate a neighbor", function(){
  it("should be true for neighbors", function(){
    var twoD = [ [0,1,2],[3,null,4],[5,6,7] ];
    expect(puzzle.isNeighbor(twoD, new Tile(1,0))).toBe(true);
    expect(puzzle.isNeighbor(twoD, new Tile(1,2))).toBe(true);
    expect(puzzle.isNeighbor(twoD, new Tile(0,1))).toBe(true);
    expect(puzzle.isNeighbor(twoD, new Tile(2,1))).toBe(true);
    expect(puzzle.isNeighbor(twoD, new Tile(0,0))).toBe(false);
    expect(puzzle.isNeighbor(twoD, new Tile(0,2))).toBe(false);
    expect(puzzle.isNeighbor(twoD, new Tile(2,0))).toBe(false);
    expect(puzzle.isNeighbor(twoD, new Tile(2,2))).toBe(false);
  });
});

describe("Move Tile", function(){
  it("should return a new grid with null moved", function(){
    var twoD = [ [0,1,2],[3,null,4],[5,6,7] ];
    
    var coordinate = new Tile(1,0);
    var newGridAndTile = puzzle.moveTile(twoD,coordinate);
    
    var newGrid = newGridAndTile.grid;
    var newTile = newGridAndTile.coordinate;
  
    expect(newTile.row).toBe(1);
    expect(newTile.column).toBe(1);

    expect(newGrid[1][0]).toBe(null);

  });
});

describe("Grid", function(){
  it("should pretty print", function(){
    var s = [0,1,2,3,4,5,6,7,null]
    var pretty = '    0 |    1 |    2\r\n    3 |    4 |    5\r\n    6 |    7 | null\r\n'
    var grid = new Grid(s,3);
    grid.setup();
    expect(grid.prettyPrint()).toBe(pretty);
  });

  it("should generate grid", function(){
    var s = [0,1,2,3,4,5,6,7,null];
    var grid = new Grid(s,3);
    grid.setup();
    var twoD = [ [0,1,2],[3,4,5],[6,7,null] ];
    expect(grid.grid).toEqual(twoD);
 });

  
});

