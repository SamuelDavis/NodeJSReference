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
	/* Handle routing */
	if(request.url === "/") {
		//If no request url is given, assume the index page should be loaded
		request.url += "index.html";
	}
	console.log("Attempting to load a view matching the request url: " + request.url);
	fs.readFile("views" + request.url, function(error, data) {
		/* Dependent upon the request, write text to the screen using the response object.
		the .end method informs the server that it should send the response to the browser.
		If a string is supplied to the .end method, it will call response.write method and
		write that string to the browser. In this case, the contents of the appropriate
		views/ file is the string */
		if(error) {
			console.log("There was an error loading views" + request.url + ": " + error);
			response.writeHead(404, { "Content-type":"text/html" });
			response.end(fs.readFileSync("views/404.html"));
		} else {
			response.writeHead(200, { "Content-type":"text/html" });
			console.log("Serving up views" + request.url + " content.");
			response.end(data);
		}
	});
});

console.log("<------->");

//Start server (listening for HTTP requests)
/* The server.listen method assigns the server a port and host to listen for HTTP requests */
console.log("Setting server to listen at " + config.host + ":" + config.port);
server.listen(config.port, config.host, function() {
	console.log("Listening at " + config.host + ":" + config.port);
});

console.log("<------->");

console.log("End");