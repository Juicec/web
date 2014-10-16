var html_blocks_path = './../../display/blocks/';
var html_pages_path = './../../display/pages/';
var fs = require('fs');
fs.writeFileSync('./pages.js', 'var file = require("./../datacontrol/fileWorks");', ['a']);

function page(data) {
	var title = 'function '+data.name+'(response) {'
	var writeHead = 'response.writeHead(200,{"Content-Type" : "text/html"});';
	var top = data.header ? header() : '';
	var content = 'file.include_sync("'+html_pages_path+data.file_name+'.html", response);';
	var bottom = data.footer ? footer() : '';
	var end = 'response.end(); } exports.'+data.name+' = '+data.name+';';
	var fin = title+writeHead+top+content+bottom+end;
	fs.appendFileSync('./pages.js', fin, ['a']);
	
	function header(){
		return 'file.include_sync("'+html_blocks_path+'head.html", response);';
	}
	function footer(){
		return 'file.include_sync("'+html_blocks_path+'footer.html", response);';
	}
}

exports.page = page;