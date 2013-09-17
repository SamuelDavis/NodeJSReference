/*
This example makes use of the Node.js module: ExpressJS
Please install express using the Node Package Manager
Command: npm install express
*/

console.log("Begin");

/*
The Express framework (http://expressjs.com/)
is a third-party extension for the HTTP module
which improves the creation/management of Node.js servers
*/
var express = require("express"),
	fs = require("fs");
var config = JSON.parse(fs.readFileSync("files/config.json"));

console.log("<------->");

//Create server
console.log("Creating Express server.");
var app = express();

//Configure routing
console.log("Configuring Express routing.")
//Make sure Express uses .get method callbacks before loading a static page
app.use(app.router);
//Define public directory for static files (ie. views)
app.use(express.static(__dirname + "/views"));

//Define routes: the first route the request url matches will be called
/* The Express app .get method allows you
to define callback methods for specific routes */
console.log("Defining Express routes and callbacks.");
app.get("/", function(request, response) {
	//The Express .send method functions similar to response.end
	response.send(fs.readFileSync("views/index.html").toString());
});

//colons are used to segment parts of the request url as variables
app.get("/getvar/:text", function(request, response) {
	response.send("The url segment after /getvar/ is: " + request.params.text);
});

//Define a final catch-all for all routes which don't apply and display a 404 page
app.get("*", function(request, response) {
	//The .send method accepts an optional, second parameter for a status-code
	response.send(fs.readFileSync("views/404.html").toString(), 404);
});

console.log("<------->");

//Start server (listening for HTTP requests)
/* The server.listen method assigns the server a port and host to listen for HTTP requests */
console.log("Setting server to listen at " + config.host + ":" + config.port);
app.listen(config.port, config.host);

console.log("<------->");

console.log("End");