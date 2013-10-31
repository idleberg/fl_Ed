module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	var jsFiles = [
        'src/fl_ctrl.js',
        'src/fl_view.js'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // HTML
        htmlhint: {
		    build: {
		        options: {
		            'tag-pair': true,
		            'tagname-lowercase': true,
		            'attr-lowercase': true,
		            'attr-value-double-quotes': true,
		            'doctype-first': true,
		            'spec-char-escape': true,
		            'id-unique': true,
		            'head-script-disabled': true,
		            'style-disabled': true
		        },
		        src: ['index.html']
		    }
		},

		// JavaScript
        uglify: {
		    build: {
		        src: jsFiles,
    			dest: 'build/fl_Ed.min.js'
		    }
		},

		// CSS
		csslint: {
		  lax: {
		    src: 'src/fl_view.css',
		  }
		},

		cssmin: {
            build: {
                src: 'src/fl_view.css',
                dest: 'build/fl_Ed.min.css'
            }
        },

        watch: {
		    html: {
		        files: ['index.html'],
		        tasks: ['htmlhint']
		    },
		    js: {
		        files: ['src/fl_ctrl.js', 'src/fl_view.js'],
		        tasks: ['uglify']
		    },
		    css: {
		        files: ['src/fl_view.css'],
		        tasks: ['cssmin']
		    }
		}

    });

    grunt.registerTask('default', 'watch');

    // Aliases
    grunt.registerTask('css', 'cssmin');
    grunt.registerTask('js', 'uglify');

};