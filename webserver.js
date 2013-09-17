console.log("Begin");

/*
The HTTP module (http://nodejs.org/api/http.html)
makes a variety of http request-handling methods avilable to the server
*/
var http = require("http"),
	fs = require("fs");

console.log("<------->");

/* Server initalization */

//Load server configuration details (host/port)
console.log("Loading server config file synchronously.");
var config = JSON.parse(fs.readFileSync("files/config.json"));

//Create server
console.log("Creating Node.js server.");
/* The http.createServer method defines a callback function with
request and response objects to handle HTTP requests sent to the server
from the browser. */
var server = http.createServer(function(request, response) {
	console.log("Received request: " + request.url);
});

//Start server (listening for HTTP requests)
/* The server.listen method assigns the server a port and host to listen for HTTP requests */
console.log("Setting server to listen at " + config.host + ":" + config.port);
server.listen(config.port, config.host, function() {
	console.log("Listening at " + config.host + ":" + config.port);
});


console.log("End");