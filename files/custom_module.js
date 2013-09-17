/* This is a custom module defined as a part of the custommodules.js example */

//Define functions which can be called within this module
function privateFunction() {
	return "This is a private function from the custom module.";
}

function publicFunction() {
	return "This is a public function from the custom module.";
}

function privateCaller() {
	var message = publicFunction();
	message += ".. which calls a private function: ";
	message += privateFunction();
	return message;
}

//Make defined functions publicly available after the module is invoked with .require
module.exports.aPublicMethod = publicFunction;
module.exports.aPrivateMethodCaller = privateCaller;