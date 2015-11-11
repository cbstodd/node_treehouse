var fs = require('fs');

function mergeValues(values, content) {
  //Cycle over all {{keys}} with the value of the object.
  for (var key in values) {
    content = content.replace('{{' + key + '}}', values[key]);
  }
  //Return merged conent
  return content;
}

function view(templateName, values, response) {
  //Read from the template files.
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf8'});
  //Insert values into the content.
  fileContents = mergeValues(values, fileContents);

  //Write out to the response.
  response.write(fileContents);


}

module.exports.view = view;
