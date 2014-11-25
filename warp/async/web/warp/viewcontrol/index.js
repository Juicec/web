var server = require("./../server/server");
var router = require("./../server/router");

var pages = require('./pages');

var handle = {}
handle["/"] = pages.api_list;
handle["/api"] = pages.api_list;
handle["/api/"] = pages.api_list;
handle["/api/get_user_info"] = pages.get_user_info;
handle["/api/save_user_info"] = pages.save_user_info;

server.start(router.route, handle);