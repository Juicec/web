module.exports = {

    new: {
        expand: true,
        cwd: 'dist/prod/js',
        src: '**/*.js',
        dest: 'dist/prod/js',
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
