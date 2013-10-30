module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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

        uglify: {
		    build: {
		        files: {
		            'dist/fl_view.js': ['dist/fl_view-dev.js']
		        }
		    }
		},

		cssmin: {
            build: {
                src: 'dist/fl_view-dev.css',
                dest: 'dist/fl_view.css'
            }
        },

        watch: {
		    html: {
		        files: ['index.html'],
		        tasks: ['htmlhint']
		    },
		    js: {
		        files: ['dist/fl_view-dev.js'],
		        tasks: ['uglify']
		    },
		    css: {
		        files: ['dist/fl_view-dev.css'],
		        tasks: ['cssmin']
		    }
		}

    });

    grunt.registerTask('default', []);

};