/**
 * Uses the celeri library to parse the cli options.
 *
 * @param argv
 * @return an object containing the size and difficulty 
 */
exports.parseCli = function(argv){
  var celeri = require('celeri');
  var cliData = null;
  celeri.option({
    command : 'solve :size :difficulty',
    description : "Solves the ZipScene code test for [size] and  [difficulty].",
  }, function(data) {
    cliData = data;
  });

  celeri.parse(argv);
  if(cliData === null){
    console.error("Please specify the correct parameters. Use 'help' for options.");
    process.exit(1);
  }
  return cliData;
}
