var http = require('http');
var Forecast = require('forecast.io');

var options = {
  APIKey: process.env.FORECAST_API_KEY,
  timeout: 1000
},
forecast = new Forecast(options);


forecast.get(latitude, longitude, function (error, res, data) {
  if (error) throw error;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});

var time = new Date().setDate(0); // lets use an arbitrary date
forecast.getAtTime(latitude, longitude, time, function (error, res, data) {
  if (error) throw error;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});

function printMessage(latitude, longitude, data) {
	var message = "The weather in: " + latitude + " lat. and " + longitude + " long is: " + data;
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
