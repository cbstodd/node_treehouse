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
  // localhost:1337

//Prints Message to server console.
console.log('Server running at localhost:1337');
