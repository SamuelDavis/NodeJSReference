//Get command-line arguments. Slice off "node [filename]".
var childData = process.argv.slice(2);
console.log(__filename + " childData:", childData);

global.ticker = 0;
var data = {
	"source": __filename,
	"message": "Hello world (2)!"
}

console.log("Setting child " + __filename + "'s response interval.");
//Every 2 seconds, respond to the parent process
var interval = setInterval(function() {
	data.ticker = global.ticker;
	//Trigger a 'message' response
	process.send(data);
	global.ticker++;
	if(global.ticker > 10) {
		console.log("Clearing child " + __filename);
		clearInterval(interval);
	}
}, 500);