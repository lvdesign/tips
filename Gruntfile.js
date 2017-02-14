/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
    	global: {
	    	options:{
	    		sourceMap:true,
	    		sourceMapName : 'js/sourcemap.map'
	    	},
      
	        files: {
	          'js/site.min.js' : ['_j/main.js']
	        }
      	}
    },

    sass: {
      global: {
        options: {
          style: "compressed"
        },
        files: {
          "css/global-unprefixed.css": "scss/main.scss"
        }
      }
    },

    autoprefixer: {
      global: {
        src: "css/global-unprefixed.css",
        dest: "css/global.css"
      }
    },

    shell: {
      jekyllServe: {
        //command: "jekyll serve --baseurl URL"
        command: "jekyll serve --baseurl"
      },
      jekyllBuild: {
        //command: "jekyll build --config _config-dev.yml"
        command: "jekyll build --config _config-dev.yml"
      }
    },

    watch: {
   
      options: {
        debounceDelay: 1000,
        livereload: true,
      },
     
      
      site: {
        files: ["index.md",  "_layouts/*.html", "_posts/*.md", "_includes/*.html", "feed.xml", "archive/*.md", "about/*.md"],
        tasks: ["shell:jekyllBuild"]
      },
      js: {
        files: ["js/site.min.js"],
        tasks: ["uglify", "shell:jekyllBuild"]
      },
      css: {
        files: ["scss/*.scss"],
        tasks: ["sass", "autoprefixer", "shell:jekyllBuild"]
      },
      svgIcons: {
        files: ["svg/*.svg"],
        tasks: ["svgstore", "shell:jekyllBuild"]
      }
    },
    
    connect:{
        options: {
                    port: 9000,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    livereload: 35729
                },
    
                dist: {
                    options: {
                        open: true,
                        base: {
                            path: 'site',
                            options: {
                                index: 'index.html',
                                maxAge: 300000
                            }
                        }
                    }
                }
    
    },

    svgstore: {
      options: {
        prefix : "shape-",
        cleanup: false,
        svg: {
          style: "display: none;"
        }
      },
      default: {
        files: {
          "_includes/svg-defs.svg": ["svg/*.svg"]
        }
      }
    }

  });

require("load-grunt-tasks")(grunt);


grunt.registerTask("serve", ["shell:jekyllServe"] );

grunt.registerTask("default", ["sass", "autoprefixer", "uglify", "svgstore", "shell:jekyllBuild", "watch"]);


grunt.event.on('watch', function(action, filepath, target) {
  grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
});



};


