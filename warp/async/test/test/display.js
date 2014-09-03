var file = require("./fileWorks");

function home(response) {
	response.writeHead(200,{"Content-Type" : "text/html"});
	var data2 = 'rr';

	file.include_sync('./head.html', response);
	file.include_sync('./body.html', response);
	file.include_sync('./footer.html', response);
	response.end();
}

function upload(response) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello Upload");
	response.end();
}

exports.home = home;
exports.upload = upload;