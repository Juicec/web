var fs = require('fs');

function include_sync(path, response){
	response.write(fs.readFileSync(path, "binary"));
}

exports.include_sync = include_sync;