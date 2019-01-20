module.exports = function(grunt) {
  "use strict";
  
  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "./src",
            src: ["www.js"],
            dest: "./bin"
          },
          {
            expand: true,
            cwd: "./src",
            src: ["./common/docs/*.*"],
            dest: "./dist/src"
          },
          {
            expand: true,
            cwd: ".",
            src: ["config.js"],
            dest: "./dist"
          }
        ]
      },
      test: {
        files: [
          {
            expand: true,
            cwd: "./spec",
            src: ["**/*", "!spec/\*\*/\*jasmine.json"],
            dest: "./dist/spec"
          },
        ]
      }
    },
    ts: {
      app: {
        files: [{
          src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
          dest: "./dist/src"
        }],
        options: {
          module: "commonjs",
          target: "es6",
          sourceMap: false,
          types: ["reflect-metadata"],
          emitDecoratorMetadata: true,
          experimentalDecorators: true
        }
      }
    },
    watch: {
      ts: {
        files: ["src/\*\*/\*.ts"],
        tasks: ["ts"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("build", [
    "copy:build",
    "ts"
  ]);

  grunt.registerTask('deployTest', [
    "copy:test"
  ]);
};