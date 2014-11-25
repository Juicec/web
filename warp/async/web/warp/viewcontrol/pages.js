var file = require("./../datacontrol/fileWorks");
var mysql = require('mysql');

var database = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '378378378'
});

database.connect()

function get_user_info(response) {
	response.writeHead(200,{"Content-Type" : "text/html"});
	response.write('get_user_info');
	response.end(); 
} 
exports.get_user_info = get_user_info;

function save_user_info(response) {
	response.writeHead(200,{"Content-Type" : "text/html"});
	response.write('save_user_info');
	response.end(); 
} 
exports.save_user_info = save_user_info;

function api_list(response) {
	response.writeHead(200,{"Content-Type" : "text/html"});
	file.include_sync("./../../display/api_list.html", response);
	response.end(); 
} 
exports.api_list = api_list;