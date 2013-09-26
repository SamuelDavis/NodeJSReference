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

/*
Note: The res.send, res.format, res.redirect, res.json, etc. methods
can accept a status code as their first argument
*/

//The root url
app.get("/", function(req, res) {
	//Reply to the request using JSON with an explicitly-set content type
	res.type("text").json(404, {
		//Get a header(s) from the request object (ex. the user-agent)
		"User Agent": req.get("user-agent"),
		//What content types can we respond to the request with
		"Accepted Content Types": req.accepted,
		//Can we respond to the request with JSON
		"Accepts JSON Response": req.acceptsCharset("JSON"),
		//What languages can we respond to the quest with
		"Accepted languages": req.acceptedLanguages
	});
});

//A custom route for responding to different content types
app.get("/contentTypes", function(req, res) {
	//Switch the response based on the content type the request accepts
	res.format({
		html: function() {
			res.send("<h1>This response is HTML.</h1>");
		},
		json: function() {
			res.send({
				message: "This message is JSON."
			});
		},
		text: function() {
			res.send("This response is text.");
		}
	});
});

//A custom route which redirects the user to the homepage
app.get("/redirectMe", function(req, res) {
	//Trigger a redirect to the '/' route
	res.redirect("/");
});

//Start the Express server
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
