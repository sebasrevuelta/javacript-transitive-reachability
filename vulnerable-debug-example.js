// vulnerable-debug-example.js
const debug = require("debug")("demo");

// Attacker supplies a string that triggers regex backtracking
// (this kind of input could be logged if user input is passed into debug)
const malicious = "a".repeat(10000) + "!";

// %o forces debug to inspect the object/string deeply
debug("%o", malicious);
