/* Include required Node/Express modules */
var express = require("express"),
	http = require("http");

/* Initialize the Express app */
var app = express();

/* Set some configuration details */
app.configure(function() {
	//Set the port to listen on
	app.set("port", process.env.PORT || 3000);
	//Explicitly set a views/ directory to this_directory/views
	app.set("views", __dirname + "/views");
	//Explicitly set the rendering engine (set the default extension, ex. 'home.jade' becomes just 'home')
	app.set("view engine", "jade");
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
	res.render("home", {
		title: "Building Web Apps in Node with Express"
	});
});

//Start the Express server
http.createServer(app).listen(app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
