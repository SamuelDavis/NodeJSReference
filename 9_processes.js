console.log("Begin");

/*
The HTTP module (http://nodejs.org/api/http.html)
makes a variety of http request-handling methods avilable to the server
*/
var childProcess = require("child_process"),
	children = [],
	childrenData = [
		["9_process1.js", "itemB", "itemC"],
		["9_process2.js", "itemB", "itemC"],
		//["9_process3.js", "itemE", "itemF"]
	];

console.log("Creating children...");
//Create new children for each of the child-data array elements
childrenData.forEach(function(childData) {
	//Initialize the new child
	var child = childProcess.fork(__dirname + "/" + childData[0], childData);
	//Listen for "exit" event
	child.on("exit", function() {
		console.log("Child " + childData[0] + " exited.", arguments);
	});
	//Listen for "message" event
	child.on("message", function() {
		console.log("Child " + childData[0] + " message:", arguments);
	});
	//Append child to children array for tracking purposes
	children.push(child);
});

//Listen for main process exit
process.on("exit", function() {
	console.log("Exiting main process:", arguments);
	//Close all child processes before quitting
	children.forEach(function(child) {
		child.kill();
	});
});

console.log("End");