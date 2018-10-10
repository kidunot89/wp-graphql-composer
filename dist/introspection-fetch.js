var fetch = require('node-fetch');
var fs = require('fs');

fetch('http://wpgraphql.example:8000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    operationName: '',
    query: '\n      {\n        __schema {\n          types {\n            kind\n            name\n            possibleTypes {\n              name\n            }\n          }\n        }\n      }\n    '
  })
}).then(function (result) {
  return result.json();
}).then(function (result) {
  // here we're filtering out any type information unrelated to unions or interfaces
  var filteredData = result.data.__schema.types.filter(function (type) {
    return type.possibleTypes !== null;
  });
  result.data.__schema.types = filteredData;
  fs.writeFile('./fragmentTypes.json', JSON.stringify(result.data), function (err) {
    if (err) {
      console.error('Error writing fragmentTypes file', err);
    } else {
      console.log('Fragment types successfully extracted!');
    }
  });
});