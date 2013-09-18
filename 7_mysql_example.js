/*
This example makes use of the Node.js module: mysql
Please install express using the Node Package Manager
Command: npm install mysql
*/

console.log("Begin");

/*
The mysql module creates an MySQL-Database interface for Node.js servers
*/
var mysql = require("mysql");

console.log("<------->");

console.log("Creating and opening the MySQL server connection.");
//Create MySQL server connection.
var connection = mysql.createConnection({
	"host": "127.0.0.1",
	"database": "test"
});

//Open MySQL server connection
connection.connect(function(error) {
	if(error) {
		console.log("There was an error connecting to the MySQL server.", error);
	} else {
		console.log("Successfully connected to the MySQL server.");

		console.log("<------->");

		//Insert some test data
		console.log("Inserting test data into test_table.")
		connection.query("INSERT INTO test_table SET ?", {"data":"test"}, function(error, result) {
			if(error) {
				console.log("There was an error instering data into test_table: ", error);
			} else {
				console.log("Successfully inserted data into test_table: ", result);
			}
		});

		console.log("<------->");

		//Query the inserted test data
		console.log("Selecting data from test_table.");
		connection.query("SELECT * FROM test_table", function(error, result) {
			if(error) {
				console.log("There was an error selecting data from test_table: ", error);
			} else {
				console.log("Data selected from test_table: ", result);
			}
		});

		console.log("<------->");

		//Close the MySQL server connection
		console.log("Closing connection to the MySQL server.");
		connection.end(function(error) {
			if(error) {
				console.log("There was an error while disconnecting from the MySQL server: ", error);
			} else {
				console.log("Successfully disconnected from the MySQL server.");
			}
		});
	}
});

console.log("<------->");

console.log("End");