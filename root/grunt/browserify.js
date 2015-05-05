module.exports = {
    dev: {
        options:      {
  		  	transform:  [ require('grunt-react').browserify ],
  		  	browserifyOptions: {
         		debug: true
     		}	
  		},
  		src:        'js/warp/app.js',
  		dest:       'js/dist/js/flux_bundle.js'
    },
    prod: {
        options:      {
  		  	transform:  [ require('grunt-react').browserify ]	
  		},
  		src:        'js/warp/app.js',
  		dest:       'js/dist/js/flux_bundle.js'
    }
};
