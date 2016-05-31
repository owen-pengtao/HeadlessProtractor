module.exports = function(grunt) {

require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      options: {
        stdout: true
      },
      selenium: {
        command: './selenium/start',
        options: {
          stdout: false,
          async: true
        }
      },
      protractor_install: {
        command: 'node ./node_modules/protractor/bin/webdriver-manager update'
      },
      npm_install: {
        command: 'npm install'
      }
    },

    protractor: {
      options: {
        keepAlive: false,
        configFile: "conf.js"
      },
      singlerun: {
      },

      
      specifyspecs:  {
          options: {
                args: {
                    specs: ['tests/login.js']
                }
          }
      },
      auto: {
        keepAlive: true,
        options: {
          args: {
            seleniumPort: 4444
          }
        }
      }
    }
  });

  grunt.registerTask('test:e2e', ['protractor:singlerun']);
  grunt.registerTask('test:specify', ['protractor:specifyspecs']);
  grunt.registerTask('install', ['update','shell:protractor_install']);
  grunt.registerTask('update', ['shell:npm_install']);
};
