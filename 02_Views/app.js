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
	res.render("home.jade", {
		title: "Building Web Apps in Node with Express"
	});
});

//Start the Express server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
