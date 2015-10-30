//Problem: We need a simple way to look at users badge count and JS points.
//Solution: User Node.js to connect to Treehouse API to get profile information to print out.
var profile = require('./profile.js');

//Profile usernames requested.
var users = ['colinstodd', 'colinstodd2', 'chalkers'];

// //iterates each profile username;
// users.forEach(function(username) {
// 	profile.get(username);
// });

//Shortened version of above code.
users.forEach(profile.get);
