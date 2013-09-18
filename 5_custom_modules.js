console.log("Begin");

/*
The customModule module (files/custom_module.js)
is a user-defined module created as a part of this example
*/
var customModule = require("./files/custom_module.js");

console.log("<------->");

console.log("Logging the customModule object.");
console.log(customModule);

console.log("Logging the private-caller method.");
console.log("Return value: '" + customModule.privateCaller() + "'");

console.log("<------->");

console.log("End");