/* Include required Node/Express modules */
var express = require("express"),
	http = require("http");

/* Initialize the Express app */
var app = express();

/* Set some configuration details */
app.configure(function() {
	//Set the port to listen on
	app.set("port", process.env.PORT || 3000);
	//Define a custom setting
	app.set("MySetting", true);

	/*
	Middleware are other applications Node/Express may utilize to add greater functionality
	WARNING: The order in which middleware is applied is important
	Express includes the Connect middleware library by default. Otherwise connect would need to be required above
	and the below methods would be 'connect.' rather than 'express.'
	*/
	//Allow Express to parse the request.body (for POST requests)
	app.use(express.bodyParser());
	//Allow the browser to make PUT/DELETE requests (REQUIRES BODYPARSER TO BE APPLIED BEFOREHAND)
	app.use(express.methodOverride());
	//Make express check all routes before sending a request to the express.static middleware method
	app.use(app.router);
	//Define a folder where assets are held (ie. images, files, etc.)
	app.use(express.static(__dirname + "/public"));
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
	res.json(req.body);
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

var arr = ["a", "b", "c", "d", "e", "f", "g"];

//Define a route which parses a request segment as a range
app.get("/arrSlice/:from-:to", function(req, res) {
	//Parse the range values as integers
	var from = parseInt(req.params.from, 10),
		to = parseInt(req.params.to, 10);

	//User the ranges to slice an array (print it as a json object)
	res.json(arr.slice(from, to + 1));
});

/*
Route preconditioning (functions as custom middleware)
Allows you to format a route variable in a function outside of the route itself
Ex: recreate the above app.get using preconditioning
*/

/*
app.param methods take precedence over app.get/app.post methods
As a result (in this example) whenever a route contains "p1",
the request's "p1" will be parsed as an integer beforehand
*/
app.param("p1", function(req, res, next, param) {
	//Parse the parameter as an integer
	req.p1 = parseInt(param, 10);
	//Trigger the callback from the originating app.get/app.post method
	next();
});

app.param("p2", function(req, res, next, param) {
	//Parse the parameter as an integer
	req.p2 = parseInt(param, 10);
	//Trigger the callback from the originating app.get/app.post method
	next();
});

app.get("/arrSlice2/:p1-:p2", function(req, res) {
	res.json(arr.slice(req.p1, req.p2 + 1));
});

var viewsOfHelloTxt = 0;
/* Catch requests for the hello.txt file */
app.get("/hello.txt", function(req, res, next) {
	viewsOfHelloTxt++;
	//Allow the request to continue to the default (public/)
	next();
});

//Check how many times the above route was triggered
app.get("/helloViews", function(req, res) {
	res.send("Hello.txt has been viewed " + viewsOfHelloTxt + " times.");
});

//Define a custom middleware function
function loadElem(req, res, next) {
	//Use the request's elemIndex param to select an element from the array 'arr' above
	req.elem = arr[parseInt(req.params.elemIndex, 10)];
	if(req.elem === undefined) {
		req.elem = "Undefined";
	}
	//Allow the request to continue to its defined route callback
	next();
}

//Call the custom middleware method loadElem before triggering the route callback
app.get("/viewArray/:elemIndex", loadElem, function(req, res) {
	res.json({"Elem": req.elem });
});

/* Handling errors */
//404
app.use(function(req, res, next) {
	res.send(404, "Page does not exist!");
});

//Define an endpoint for custom errors
app.use(function(err, req, res, next) {
	//Set the status code if it was provided in the error object (default to 404)
	res.status(err.status || 404);
	res.send(err.message);
});

var arr2 = ["z", "y", "x", "w", "v"];
//Custom error response for bad data rather than missing pages
app.get("/error/:arrIndex", function(req, res, next) {
	//Get a handle on the array index request argument
	arrIndex = parseInt(req.params.arrIndex, 10);

	//Does the array have that index?
	if(arrIndex < 0 || arrIndex >= arr2.length) {
		//No? display error.
		//calling next(); would pass the request to public/ and then to the 404 error
		//Define an error object describing what went wrong
		var err = new Error("Index " + arrIndex + " is out of range.");
		//Set a custom error status
		err.status = "Custom Error";
		//Pass that error to the next() function to display that custom error
		next(err);
	} else {
		//Yes? Display element at that index.
		res.send("Element " + arrIndex + " is " + arr2[arrIndex]);
	}
});

//Start the Express server
http.createServer(app).listen(app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
