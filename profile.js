var http = require('https');

function printMessage(username, badgeCount, points) {
	var message = "The user: " + username + ", has " + points + " Ruby points and " + badgeCount + " badges.";
	console.log(message);
}

//Works with request.on('error', printError);.
function printError(error) {
	//Parses error here.
	console.error(error.message);
}

function getUserProfile(username) {
	//Connect to the API URL (http://www.teamtreehouse/colinstodd.json)
	var request = http.get('https://teamtreehouse.com/' + username + '.json', function(response) {
		// console.dir(response);
		var body = '';
		// Reads all data on url via the data host method.
		response.on('data', function(chunk) {
			body += chunk;
		});
		//Tells the data to load everything to the 'end' of the body.
		//Prints error message.
		response.on('end', function() {
			if (response.statusCode === 200) {
				try {
					//Parse data.
					var profile = JSON.parse(body);
					//Print data.
					printMessage(username, profile.badges.length, profile.points.Ruby);
					// console.dir(body);
				} catch (error) {
					printError(error);
				}
			} else {
				printError({
					message: "There was an error getting the profile for " + username + ". ERROR MESSAGE:(" + http.STATUS_CODES[response.statusCode] + ")."
				});
			}
		});
	});
	//Request a calback error with the node error native object.
	//Connection error.
	request.on('error', printError);

	//Parse the data.
	//Print data.
}


//Gets -> Asigns and Exports the getUserProfile.
module.exports.get = getUserProfile;
