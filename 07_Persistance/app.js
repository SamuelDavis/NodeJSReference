/* Include required Node/Express modules */
var express = require('express'),
	http = require('http');

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
	//Enable the use of cookies
	app.use(express.cookieParser());
	//Enable the use of sessions (requires cookies and a string to generate a hash value)
	app.use(express.session({ secret: "This is the Session hash." }));
	//Make express check all routes before sending a request to the express.static middleware method
	app.use(app.router);
	//Define a folder where assets are held (ie. images, files, etc.)
	app.use(express.static(__dirname + "/public"));
});

/* Define Routes */

/* Cookie Handling */
//Define a route which manipulates a cookie
app.get("/cookie/:val", function(req, res) {

	//create a cookie named "myCookie" with a value of :val
	res.cookie("myCookie", req.params.val)
		.send("<p>To see the cookie contents <a href='/cookie'>go here</a>.</p>");
});

//Define a route which views the cookie set by the above route
app.get("/cookie", function(req, res) {
	//Clear the cookie which was set in the above route
	res.clearCookie("myCookie")
	//but also write its value to the browser
		.send("<p>The cookie contents is: " + req.cookies.myCookie);
});

/* Session Handling */
//Define a route which manipulates the session
app.get("/session/:val", function(req, res) {
	//Set the :val value to a session variable
	req.session.sessionVal = req.params.val;
	res.send("<p>To see the session.sessionVal contents <a href='/session'>go here</a>.</p>")
});

app.get("/session", function(req, res) {
	res.send("<p>The session.sessionVal contents is: " + req.session.sessionVal);
});

//Start the Express server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
