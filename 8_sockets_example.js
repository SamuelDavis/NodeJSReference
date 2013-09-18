/*
This example makes use of the Node.js modules: ExpressJS and SocketIO
Please install express and sockets using the Node Package Manager
Command: npm install express
Command: npm install socket.io
*/

console.log("Begin");

/*
The socket.io library (http://socket.io/)
is a third-party module for Node which allows for real-time
querying of the Node.js webserver from the browser
*/
var fs = require("fs"),
	config = JSON.parse(fs.readFileSync("files/config.json")),
	express = require("express"),
	app = express(),
	server = app.listen(config.port, config.host),
	//Require sockets and supply it with the Express server
	io = require("socket.io").listen(server);

console.log("<------->");

//Set 'public' directory for easy routing of requests to pages
app.use(express.static(__dirname + "/views"));

console.log("Defining a socket triggered by a 'connection' event.");
io.sockets.on("connection", function(socket) {
	//Send data to the browser with an event type of 'connected'
	socket.emit("connected", {
		"source": "backend",
		"greeting": "Hello browser!"
	});
	//Listen for 'frontendEvent's triggered by the browser
	socket.on("frontendEvent", function(data) {
		console.log(data);
	});
});

console.log("<------->");

console.log("End");