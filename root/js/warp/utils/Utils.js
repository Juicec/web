var _ = require('underscore');

var default_api = '/api/';

var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

post = function(data) {
	if (typeof data.success != 'function'){
		console.error('Post : success is not a function');
		return;
	}
	if (data.data && typeof data.data != 'object'){
		console.error('Post : data is not a object');
		return;
	}
	if (!data.url){
		console.error('Post : url undefine');
		return;
	}
	if (data.async)
		data.async = false;
	else
		data.async = true;

  	var xmlhttp;
  	try {
    	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  	} catch (e) {
    	try {
      		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    	} catch (E) {
      		xmlhttp = false;
    	}
  	}
  	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    	xmlhttp = new XMLHttpRequest();
  	}

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_arr = {};
            try{
               json_arr = JSON.parse(xmlhttp.responseText);
            }
            catch(e){
               console.error('invalid response. Check API');
            }
            data.success(json_arr);
	    }
	}

	var formData = new FormData();
	for ( var key in data.data ) {
	    formData.append(key, data.data[key]);
	}

	xmlhttp.open("POST", default_api+data.url, data.async);
	xmlhttp.send(formData);
};

setUrl = function(url, save_old) {
  	if (url != window.location.pathname){
  		if (save_old)
    		window.history.pushState(null,null,window.location.pathname+url);
    	else
    		window.history.pushState(null,null,url);
    	return true;
  	}
  	else
  		return false;
};

getUrl = function() {
  	return window.location.pathname.split("/");
};

getUrlParams = function() {
    var $_GET = {};
    var __GET = window.location.search.substring(1).split("&");
    for(var i=0; i<__GET.length; i++) {
        var getVar = __GET[i].split("=");
        $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
    }
    return $_GET;
};

module.exports.post = post;
module.exports.setUrl = setUrl;
module.exports.getUrl = getUrl;
module.exports.getUrlParams = getUrlParams;