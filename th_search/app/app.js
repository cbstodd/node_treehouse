//Problem: We need a simple way to look at users badge count and JS points.
//Solution: User Node.js to connect to Treehouse API to get profile information to print out.
var profile = require('./profile.js');

//Gets users via command line form the argv array by: $ node app.js [username].
var users = process.argv.slice(2);


// // Profile usernames requested.
// var users = ['colinstodd', 'colinstodd2', 'chalkers', 'davemcfarland'];

// //iterates each profile username;
// users.forEach(function(username) {
// 	profile.get(username);
// });

//Shortened version of above code.
users.forEach(profile.get);
