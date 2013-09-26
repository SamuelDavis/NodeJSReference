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
	res.send(JSON.stringify({
		//Get a header(s) from the request object (ex. the user-agent)
		"User Agent": req.get("user-agent"),
		//What content types can we respond to the request with
		"Accepted Content Types": req.accepted,
		//Can we respond to the request with JSON
		"Accepts JSON Response": req.acceptsCharset("JSON"),
		//What languages can we respond to the quest with
		"Accepted languages": req.acceptedLanguages
	}));
});

//A custom route which has an optional :name segment
app.get("/name/:name?", function(req, res) {
	//grab the :name part of the request, but give it a default value
	var name = req.param("name", "Default Name");
	res.send("The name is: " + name);
});

//Start the Express server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
