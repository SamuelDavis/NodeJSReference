console.log("Begin");

/*
The File System module (http://nodejs.org/api/fs.html)
makes a variety of file-handling methods avilable to the server
*/
var fs = require("fs"),
	syncFile = "files/sample_sync.txt",
	asyncFile = "files/sample_async.txt",
	watchFile = "files/sample_watch.txt";

console.log("<------->");

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

console.log("<------->");

/* Reading files */
console.log("Reading files...");

//Synchronously
/* The .readFileSync method will pause execution
until a designated file has been read completely */
console.log("Reading " + syncFile + " synchronously.")
var fileContents = fs.readFileSync(syncFile);
console.log(syncFile + " contents: " + fileContents);
console.log("Finished reading " + syncFile + " synchronously.");

//Asynchronously
/* The .readFile method supplies the contents of a designated file to a callback function */
console.log("Reading " + asyncFile + " asynchronously.");
fs.readFile(asyncFile, function(error, data) {
	if(error) {
		console.log("Could not read " + asyncFile + " asynchronously.");
	} else {
		console.log(asyncFile + " contents: " + data);
	}
});
console.log("Continuing execution while reading " + asyncFile + " asynchronously.");

console.log("<------->");

/* Watching files */
console.log("Watching files...");

/* The .watchFile method causes a callback function to be triggered
whenever a designated file is altered. */
console.log("Creating " + watchFile + " synchronously.");
fs.writeFileSync(watchFile, "Hello world (watch me)!");
console.log("Watching " + watchFile + ".");
fs.watchFile(watchFile, function(current, previous) {
	console.log(watchFile + " previous data:");
	console.log(previous);
	console.log(watchFile + " current data:");
	console.log(current);
	console.log(watchFile + " size change: " + (current.size - previous.size) + ".");
});
console.log("Changing " + watchFile + " synchronously.");
fs.writeFileSync(watchFile, "Hello world (watch me, changed)!");
console.log("Finished changing " + watchFile + " synchronously.");

console.log("<------->");

console.log("End");