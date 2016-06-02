console.log("Node starting...");

var haiku = require('./haiku_generator.js');

// Made dictionary an object (associative-array) rather than a 
// normal array -- just personal preference!
var dictionary = haiku.formatData(haiku.cmudictFile);
console.log("\n");

// Logging haikus
console.log("One-word-per-line Haiku:");
console.log(haiku.createHaiku([[5],[7],[5]],dictionary));
console.log("Mixed-words-per-line Haiku:");
console.log(haiku.createHaiku([[1,1,1,2],[1,1,2,2,2],[2,1,1,1]],dictionary));

