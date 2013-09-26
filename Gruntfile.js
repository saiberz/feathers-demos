module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				options: {
					separator: ';'
				},
				src: ['public/js/bootstrap.min.js', 'public/js/jquery.flexslider-min.js', 'public/js/rotate.js', 'public/js/main.js'],
				dest: 'public/js/production.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'public/js/production.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/css/production.min.css': ['public/css/flexslider.css', 'public/css/font-awesome.min.css', 'public/css/animate.css', 'public/css/bootstrap.min.css',  'public/css/main.css', 'public/css/custom-styles.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};
