/* globals module, require */

module.exports = function(grunt) {

  "use strict";
  
  require("load-grunt-tasks")(grunt);
  


  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

//parser,minify,compress js
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
//prepro css
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
//autoprefix
    autoprefixer: {
      global: {
        src: "css/global-unprefixed.css",
        dest: "css/global.css"
      }
    },
//command 
    shell: {
     jekyllBuild: {
        //command: "jekyll build --config _config-dev.yml"
        command: "jekyll build --watch"
      },
      jekyllServe: {
        //command: "jekyll serve --baseurl URL"
        command: "jekyll serve"
      },
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
    },

watch: {

   options: {
     base: '_site/',
     livereload: {
         host: '127.0.0.1',
         port: 4000
       }
         
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

    
   connect: {
               options: {
                   port: 4000,
                   // Change this to '0.0.0.0' to access the server from outside.
                   hostname: '127.0.0.1',
                   livereload: 35729
               },
   
               dist: {
                   options: {
                       open: true,
                       base: {
                           path: '_site/',
                           options: {
                               index: 'index.html',
                               maxAge: 300000
                           }
                       }
                   }
               }
           },
    

  });

grunt.registerTask("build", [
"sass", 
"autoprefixer", 
"uglify", 
"svgstore", 
"shell:jekyllBuild",
"watch"
]);

grunt.registerTask('default', ['build']);
grunt.registerTask("serve", ['shell:jekyllServe', 'connect:dist'] );



grunt.event.on('watch', function(action, filepath, target) {
  grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
});



};


