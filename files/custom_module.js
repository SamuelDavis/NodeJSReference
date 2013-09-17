/* This is a custom module defined as a part of the custommodules.js example */

//Define functions which can be called within this module
var privateMethods = {
		privateFunction: function() {
			return "This is a private function from the custom module.";
		}
	},
	
	publicMethods = {
		publicFunction: function() {
			return "This is a public function from the custom module.";
		},

		privateCaller: function() {
			var message = publicMethods.publicFunction();
			message += ".. which calls a private function: ";
			message += privateMethods.privateFunction();
			return message;
		}
	};

//Make defined functions publicly available after the module is invoked with .require
for(var method in publicMethods) {
	module.exports[method] = publicMethods[method];
}