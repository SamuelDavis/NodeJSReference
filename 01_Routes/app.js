/* Include required Node/Express modules */
var express = require('express'),
	http = require('http');

/* Initialize the Express app */
var app = express();

/* Set some configuration details */
app.configure(function() {
	//Set the port to listen on
	app.set('port', process.env.PORT || 3000);
	//Set Express to parse the request.body (for POST requests)
	app.use(express.bodyParser());
});

/* Define Routes */

//The root url
app.get("/", function(req, res) {
	//Write "Hello, Express!" to the browser
	res.send("Hello, Express!");
});

//Define a route with an actual request value
app.get("/hi", function(req, res) {
	//Write a message to the browser
	var message = [
	"<h1>Hello, Express!</h1>",
	"<p>Welcome to 'Building Web Apps in Node.js with Express.</p>",
	"<ul>",
	"	<li>Fast</li>",
	"	<li>Fun</li>",
	"	<li>Flexible</li>",
	"</ul>"
	].join("\n");

	res.send(message);
});

//Read a POST request from the browser
app.post("/post", function(req, res) {
	console.log(req.body); //See all POST data sent to the server
	res.send(JSON.stringify(req.body));
});

//Define a route using a regular expression
app.get(/\/users\/(\d*)\/?(edit)?\/?/, function(req, res) {
	//In this case, the req.params attribute is an array.
	//Each element of the array corrisponds to one of the parenthetical values in the route
	//[0] = (\d*), [1] = (edit)
	console.log(req.params);

	var message = "User #" + req.params[0] + "'s profile";

	//Switch depending on if they supplied the optional edit parameter
	if(req.params[1] === "edit") {
		message = "Editing " + message;
	} else if(req.params[0] !== "") {
		message = "Viewing " + message;
	} else {
		message = "No user ID supplied.";
	}
	res.send(message);
});

//Start the Express server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
