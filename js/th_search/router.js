var Profile = require("./profile.js");

//Connects from app.js



//2. Handel HTTP route GET / and POST / i.e. th_search.html
function home(request, response) {
  //if url === "/" && GET
  if (request.url === '/') {
    //show search
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    response.write('Header\n');
    response.write('Search\n');
    response.write('Footer\n');
    //if url === "/" && POST
    //redirect to /:username
  }
}


//3. Handel HTTP route GET /:username i.e. colinstodd2
function user(request, response) {
  //if url === "/..."

  var username = request.url.replace('/', '');
  if (username.length > 0) {

    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    response.write('Header\n');

    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on 'end'
    studentProfile.on("end", function(profileJSON) {
      //show profile

      //Store values needed.
      var values = {
        avatarURL: profileJSON.gravatar_url,
        username: profileJSON.name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      };
      //Simple response.
      response.write(values.username + " has " + values.badges + " badges \n");
      response.write('Footer\n');
    });
    //on 'error'
    studentProfile.on("error", function(error) {
      //show error
      response.write(error.message + '\n');
      response.write('Footer\n');
    });
  }
}


//Exports home and user to app.js -> require.
module.exports.home = home;
module.exports.user = user;
