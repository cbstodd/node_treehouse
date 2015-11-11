var Profile = require('./profile.js');
var renderer = require('./renderer.js');
//Connects from app.js

var commonHeaders = {
  'Content-Type': 'text/html'
};

//2. Handel HTTP route GET / and POST / i.e. th_search.html
function home(request, response) {
  //if url === "/" && GET
  if (request.url === '/') {
    //show search
    response.writeHead(200, commonHeaders);
    renderer.view('header', {}, response);
    renderer.view('profile', {}, response);
    renderer.view('search_form', {}, response);
    renderer.view('footer', {}, response);
    response.end();
    //if url === "/" && POST
    //redirect to /:username
  }
}


//3. Handel HTTP route GET /:username i.e. colinstodd2
function user(request, response) {
  //if url === "/..."

  var username = request.url.replace('/', '');
  if (username.length > 0) {

    response.writeHead(200, commonHeaders);
    // response.write('header', {}, response);

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
      //Passes in the actual values to the profile template.
      renderer.view('header', {}, reponse);
      renderer.view('profile', values, response);
      renderer.view('search_form', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    });
    //on 'error'
    studentProfile.on("error", function(error) {
      //show error
      renderer.view('header', {}, response);
      renderer.view('error', { errorMessage: error.message }, response);
      renderer.view('search_form', {}, response);
      renderer.view('footer', {}, response);

    });

  }
}


//Exports home and user to app.js -> require.
module.exports.home = home;
module.exports.user = user;
