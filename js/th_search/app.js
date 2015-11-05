var router = require('./router.js');

//1. Create a web server.
// To kill server $ ps -aux
// $ kill [number]
var http = require('http');

http.createServer(function(request, response) {
  //Calls home and user in router.js
  router.home(request, response);
  router.user(request, response);
}).listen(1337, "127.0.0.1");

//Prints Message to server console.
console.log('Server running at localhost:1337');



//4. Function that handels the reading of files and merge in value.
//read from file and get a string
//merge values in to string.
