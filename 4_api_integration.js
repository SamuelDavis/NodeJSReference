function getRepos(username, callback) {
	console.log("Making HTTPS request.");
	//Define options which define where/how to connect to the api
	var options = {
		"host": "api.github.com",
		"path": "/users/" + username + "/repos",
		"method": "GET"
	},
	repos = [];

	/* The https.request method makes a GET or POST request
	to the path specified in the options object and
	supplies the respnose to a callback function */
	var request = https.request(options, function(response) {
		var fullResponse = "";
		console.log("Aggregating response chunks.");
		response.on("data", function(responseChunk) {
			fullResponse += responseChunk.toString("utf8");
		});
		response.on("end", function() {
			console.log("Parsing relevant data from response.");
			//Parse the response and filter out only relevant data
			var parsedResponse = JSON.parse(fullResponse);
			parsedResponse.forEach(function(e, i, a) {
				repos.push({
					"name": e.name,
					"description": e.description
				});
			});

			callback(repos);
		});
	});

	//Finish defining request and send it
	console.log("Sending request.");
	request.end();
}

/*
This example shows how to integrate with the GitHub api
*/

console.log("Begin");

/*
The HTTPS module (http://nodejs.org/api/https.html)
makes a variety of https request-handling methods avilable to the server
*/
var https = require("https"),
	fs = require("fs"),
	username = "SamuelDavis";

console.log("<------->");

/* Call the getRepos function to query the github api
to generate an array of repository names and descriptions */
getRepos(username, function(repos) {
	console.log(repos);
});

console.log("<------->");

console.log("End");