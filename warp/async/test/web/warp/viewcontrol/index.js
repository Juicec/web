var server = require("./../server/server");
var router = require("./../server/router");
var render = require("./render");

render.page({'name':'home',
			'header':true,
			'footer':true,
			'file_name':'body'
});

render.page({'name':'login',
			'header':true,
			'footer':true,
			'file_name':'login'
});

var pages = require('./pages');

var handle = {}
handle["/"] = pages.home;
handle["/home"] = pages.home;
handle["/login"] = pages.login;

server.start(router.route, handle);