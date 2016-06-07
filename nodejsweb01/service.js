var http = require('http');
var url = require("url");
var formidable = require('formidable');
var util = require('util');

function start(route, handle){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
	    console.log("Request for " + pathname + " received.");
	    
	    if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
	    	var form = new formidable.IncomingForm();
	        form.parse(request, function(err, fields, files) {
	        	response.writeHead(200, {'content-type': 'text/plain'});
	        	response.write('received upload:\n\n');
	        	response.end(util.inspect({fields: fields, files: files}));
	        });
	        return;
	    }
	    response.writeHead(200, {'content-type': 'text/html'});
	    response.end(
	      '<form action="/upload" enctype="multipart/form-data" '+
	      'method="post">'+
	      '<input type="text" name="title"><br>'+
	      '<input type="file" name="upload" multiple="multiple"><br>'+
	      '<input type="submit" value="Upload">'+
	      '</form>'
	    );
	}
	http.createServer(onRequest).listen(3000);
	console.log("Server has started.");
}
exports.start = start;