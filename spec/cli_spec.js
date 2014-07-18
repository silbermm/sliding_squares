var cli = require('../lib/cli_parser.js');

describe("cli", function(){
  it("should return size and difficulty", function(){
    var cliOpts = cli.parseCli(
     [ 'node',
       '/data/silbermm/Projects/sliding_squares/solver.js',
       'solve',
       '23',
       '10' 
      ]
     );
    expect(cliOpts.size).toBe('23');
    expect(cliOpts.difficulty).toBe('10');
  });
});
