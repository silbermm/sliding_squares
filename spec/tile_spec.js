var Tile = require("../lib/tile.js").Tile;

describe("a tile", function(){
  it("should have correct row and column", function(){
    var c = new Tile(0,1);
    expect(c.row).toBe(0);
    expect(c.column).toBe(1);
  });
});
