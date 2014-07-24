var printf = require('printf');
var Tile = require("../lib/tile.js").Tile;
var Grid = require("../lib/grid.js").Grid;

describe("Grid", function(){
  it("should be solution", function(){
    var s = [0,1,2,3,4,5,6,null];
    var grid = new Grid(s,3);
    var isTrue = grid.isSolution();
    expect(isTrue).toBe(true);
  });

  it("should not be solution", function(){
    var s = [null, 1,2,3,4,5,6];
    var grid = new Grid(s,3);
    var isTrue = grid.isSolution();
    expect(isTrue).toBe(false);
  });
});

describe("Grid", function(){
  it("should generate 2d array", function(){
    var s = [0,1,2,3,4,5,6,7,null];
    var twoD = [ [0,1,2],[3,4,5],[6,7,null] ];
    var grid = new Grid(s, 3);
    grid.setup();
    expect(grid.grid).toEqual(twoD);
  });
});

describe("Grid", function(){
  it("should find index of the empty tile", function(){ 
    var s = [0,1,2,3,4,null,5,6,7];
    var twoD = [ [0,1,2],[3,4,null],[5,6,7] ];
    var grid = new Grid(s,3);
    grid.setup();
    expect(grid.getEmpty().row).toBe(1);
    expect(grid.getEmpty().column).toBe(2);
  });
});

describe("Grid", function(){
  it("should find Neighbors",function(){
    var s = [0,1,2,3,null,4,5,6,7];
    var grid = new Grid(s,3);
    grid.setup();
    var neighbors = grid.findNeighbors();
    expect(neighbors[0].row).toBe(0);
    expect(neighbors[1].row).toBe(2);
  });
});

describe("Grid", function(){
  it("should be true for neighbors", function(){
    var s = [ 0,1,2,3,null,4,5,6,7];
    var grid = new Grid(s,3);
    grid.setup();
    expect(grid.isNeighbor(new Tile(1,0))).toBe(true);
    expect(grid.isNeighbor( new Tile(1,2))).toBe(true);
    expect(grid.isNeighbor( new Tile(0,1))).toBe(true);
    expect(grid.isNeighbor( new Tile(2,1))).toBe(true);
    expect(grid.isNeighbor( new Tile(0,0))).toBe(false);
    expect(grid.isNeighbor( new Tile(0,2))).toBe(false);
    expect(grid.isNeighbor( new Tile(2,0))).toBe(false);
    expect(grid.isNeighbor( new Tile(2,2))).toBe(false);
  });
});

describe("Grid", function(){
  it("should move tile", function(){
    var s = [ 0,1,2,3,null,4,5,6,7 ];
    var grid = new Grid(s, 3);
    grid.setup();
    var coordinate = new Tile(1,0);
    grid.moveTile(coordinate);
    var newEmpty = grid.getEmpty(); 
    expect(newEmpty.row).toBe(1);
    expect(newEmpty.column).toBe(0);
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

