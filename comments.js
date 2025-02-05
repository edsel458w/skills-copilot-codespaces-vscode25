// Create web server and listen on port 3000
// Node.js
// 1. Create a web server
// 2. Listen on port 3000
// 3. Handle GET requests for /comments
// 4. Return a JSON response
// 5. Use the comments array as the response body
// 6. Handle POST requests for /comments
// 7. Parse the request body into a JavaScript object
// 8. Push the comment object onto the comments array
// 9. Return a JSON response with the comment object as the response body

// Load the http module
var http = require('http');
var url = require('url');
var comments = [];

// Configure our HTTP server to respond with Hello World to all requests
var server = http.createServer(function (request, response) {
  var urlParts = url.parse(request.url);

  if (request.method === 'GET' && urlParts.pathname === '/comments') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(comments));
  } else if (request.method === 'POST' && urlParts.pathname === '/comments') {
    var newComment = '';
    request.on('data', function (data) {
      newComment += data;
    });

    request.on('end', function () {
      comments.push(JSON.parse(newComment));
      response.writeHead(201, {'Content-Type': 'application/json'});
      response.end(newComment);
    });
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Not Found');
  }
});

// Listen on port 3000, IP defaults to
