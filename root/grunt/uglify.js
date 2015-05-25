module.exports = {

    new: {
        options: {
            sourceMap: true,
        },
        expand: true,
        cwd: 'js/dist/js',
        src: '**/*.js',
        dest: 'js/dist/js',
        ext: '.min.js'
    },

    dev: {
        options: {
            sourceMap: true,
        },
        expand: true,
        src: ['*.js', '!*.min.js'],
        dest: 'js',
        cwd: 'js/main',
        ext: '.min.js'      
    },

	  prod: {
        options: {
            sourceMap: false,
        },
	  	  expand: true,
        src: ['*.js', '!*.min.js'],
        dest: 'js',
        cwd: 'js/main',
        ext: '.min.js'      
    }

};
