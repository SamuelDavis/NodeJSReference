console.log("Begin");

/*
The File System module (http://nodejs.org/api/fs.html)
makes a variety of file-handling methods avilable to the server
*/
var fs = require("fs"),
	syncFile = "files/sample_sync.txt",
	asyncFile = "files/sample_async.txt";

/* Writing files */
console.log("Writing files...");

//Synchronously
/* The .writeFileSync method will pause execution until a supplied string
has been completely written to a designated file */
console.log("Writing to " + syncFile + " synchronously.");
fs.writeFileSync(syncFile, "Hello world (synchronously)!");
console.log("Finished writing to " + syncFile + " synchronously.");

//Asynchronously
/* The .writeFile method will write a supplied string to a designated file
without pausing execution and triggers a callback function when finished */
console.log("Writing to " + asyncFile + " asynchronously.");
fs.writeFile(asyncFile, "Hello world (asynchronously)!", function(error) {
	if(error) {
		console.log("Could not write to " + asyncFile + ".");
	} else {
		console.log("Finished writing to " + asyncFile + " asynchronously.");
	}
});
console.log("Continuing execution while writing to " + asyncFile + " asynchronously.");

/* Reading files */
console.log("Reading files...");

//Synchronously
/* The .readFileSync method will pause execution
until a designated file has been read completely */

//Asynchronously
/* The .readFile method supplies the contents of a designated file to a callback function */


/* Watching files */
console.log("Watching files...");

console.log("End");