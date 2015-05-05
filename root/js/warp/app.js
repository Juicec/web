var React = require('react');
var API = require('./utils/API');
var MainApp = require('./components/MainApp.react');

//API.router();

// Render Group Controller View
window.onload = function(){
	React.render(
	  	<MainApp page={ global_page } />,
	  	document.getElementById('main-flux')
	);
}
