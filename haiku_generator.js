var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
};

function formatData(data){    
  // Converts entire file into a string and splits it 
  // into an array of lines
  var lines = data.toString().split("\n");
  // Initialise dictionary as an object, since we intend for it
  // to be an associative array 
  var dictionary = {};

  // For each line in cmudict.txt
  lines.forEach(function(line){     
    // Split line into [word, phonemeStructure]
    var lineSplit = line.split("  ");
    // Cast each element as a string <-- Note For Grader: Why??
    // Remove non-alphabetic characters in words
    var word = /[a-zA-Z]+/.exec(String(lineSplit[0]))[0];
    var phonemeStructure = String(lineSplit[1]);
    var phonemeCount = 0;   
    // Split phonemeStructure into [phoneme, phoneme, ...]
    var structureSplit = phonemeStructure.split(" ");

    // For each phoneme in cmudict.txt
    structureSplit.forEach(function(phoneme){
      // Increment syllable counter according to value
      if(phoneme.match(/\d/)){
        phonemeCount++;  
      } 
    });
    // Build dictionary with phenomeCount-wordArray key-value pairs 
    // In other words, the dictionary is an object with Int-type Keys/Properties  
    // and stringArray-type values. Kind of like a linked-list, with each 'bucket'
    // containing all the words of a syllable count.

    // For first entries, we have to initialise the bucket
    if(dictionary[phonemeCount]) {
      // *** Use [] notation because of variable property name ***
      dictionary[phonemeCount].push(word);
    // For subsequent entries, we simply add to the bucket
    } else {
      dictionary[phonemeCount] = [word];
    } 
  });
  // Log dictionary   
  console.log(dictionary);
  return dictionary;
};


// createHaiku takes a 2-D array a.k.a. an array of int arrays
var createHaiku = function(structure,dictionary) {
  // Helper function that maps over each element in subStructure array
  function grabRandomWord(int) {
  // Grab relevant bucket ;
  var bucket = dictionary[int]; 
  // Grab a random word from bucket (length-1 to match indexing)
    var bucketLength = bucket.length - 1; 
    var randomWord = bucket[Math.floor(Math.random() * bucketLength)];
    return randomWord;
  };
  // For each given number in the subStructure array
  structure.forEach(function(subStructure) {
    var haikuLine = "";
    subStructure.forEach(function(int) {
        haikuLine += " " + grabRandomWord(int);
    });
    console.log(haikuLine.slice(1));

  });
  return '~~fin~~\n';
};

module.exports = {
  cmudictFile : cmudictFile,
  formatData: formatData, 
  createHaiku: createHaiku  
};


