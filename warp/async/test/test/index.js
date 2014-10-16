var server = require("./server");
var router = require("./router");
var display = require("./display");

var handle = {}
handle["/"] = display.home;
handle["/home"] = display.home;
handle["/upload"] = display.upload;

server.start(router.route, handle);