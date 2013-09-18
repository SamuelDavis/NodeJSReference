/*
This example makes use of the mongoDB database (http://www.mongodb.org/)

This example makes use of the Node.js module: mongodb
Please install express using the Node Package Manager
Command: npm install mongodb
*/

console.log("Begin");

/*
Mongo is a module which provides an interface
for interacting with a NoSQL Database. It stores data
in a BSON (binary JSON), thus integrates easily with Node.js
The module itself acts as a namespace rather than a class,
meaning most methods are invoked through classes rather than directly
from the mongo variable
*/
var mongo = require("mongodb");
var config = {
	"name": "nodejs-introduction",
	"host": "127.0.0.1",
	//The DEFAULT_PORT attribute is in the Connection class of the mongo namespace
	"port": mongo.Connection.DEFAULT_PORT
};

console.log("<------->");

//Create database and server
console.log("Creating new mongo db with name '" + config.name + "'");
var db = new mongo.Db(config.name, new mongo.Server(config.host, config.port), { w: "majority" });

//Connect to the database
db.open(function(error) {
	if(error) {
		console.log("There was an error connecting to the mongo db: ", error);
	} else {
		console.log("Successfully connected to the mongo db.");

		console.log("<------->");

		console.log("Creating user collection.");
		//Define a database table for storing users
		db.collection("user", function(error, collection) {
			if(error) {
				console.log("There was an error creating the user collection.");
			} else {
				console.log("The user collection was created successfully.");

				console.log("<------->");

				//Add users to the collection
				//console.log("Adding users to the user collection...");
				// collection.insert({
				// 	"id": "1",
				// 	"name": "John Doe",
				// 	"email": "jd@example.com"
				// }, function() {
				// 	console.log("John Doe inserted into db.");
				// });
				// collection.insert({
				// 	"id": "2",
				// 	"name": "Jane Doe",
				// 	"email": "other_jd@example.com"
				// }, function() {
				// 	console.log("Jane Doe inserted into db.");
				// });

				//Get users from collection
				var criteria = { "id":"1" };
				console.log("Querying users matching " + JSON.stringify(criteria) + " from the user collection.");
				collection.find(criteria, function(error, cursor) {
					if(error) {
						console.log("There was an error querying the user collection.");
					} else {
						console.log("successfully queried users from the user collection.")
						cursor.toArray(function(error, results) {
							if(error) {
								console.log("There was an error parsing queried users.");
							} else {
								if(results.length <= 0) {
									console.log("No users matched the given criteria: " + JSON.stringify(criteria));
								} else {
									console.log("At least one user found:");
									console.log(results);
								}
							}
						});
					}
				});
			}
		});
	}
});

console.log("<------->");

console.log("End");