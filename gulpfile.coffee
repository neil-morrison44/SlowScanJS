gulp = require "gulp"
coffee = require "gulp-coffee"
concat = require "gulp-concat"
uglify = require "gulp-uglify"
imagemin = require "gulp-imagemin"
sourcemaps = require "gulp-sourcemaps"
del = require "del"
sass = require "gulp-sass"
pleeease = require "gulp-pleeease"
browserify = require "browserify"
rename = require "gulp-rename"
$ = do require "gulp-load-plugins"

watchify     = require "watchify"
source       = require "vinyl-source-stream"

paths =
  html : "./src/index.html"
  scripts: "src/scripts/**/*.coffee"
  styles: "src/styles/**/*.scss"
  images: "src/images/**/*"
  vendorScripts: []
  infrastructureScripts: []
  images: "src/images/**/*"
  libs: "src/libs/**/*"

buildDir = "dist"

gulp.task "clean", (cb) ->
  del [buildDir], cb

gulp.task "clean:sass", (cb) ->
  del ["#{buildDir}/css"], cb

gulp.task "clean:images", (cb) ->
  del ["#{buildDir}/images"], cb

gulp.task "clean:scripts", (cb) ->
  del ["#{buildDir}/js/main*"], cb

gulp.task "watchify", ->
  bundler = watchify(
    entries    : ["./src/scripts/main.coffee"]
    extensions : [".coffee"]
    debug      : true
  )
  bundle = ->
    bundler
      .bundle()
      .on "error", -> console.log arguments
      .pipe source("main.js")
      .pipe gulp.dest "#{buildDir}/js"

  bundler.on("update", bundle)
  bundle()

gulp.task "browserify", ["clean:scripts"], ->
  bundler = browserify(
    entries    : ["./src/scripts/main.coffee"]
    extensions : [".coffee"]
    debug      : false
  )
  bundle = ->
    bundler
      .bundle()
      .on "error", -> console.log arguments
      .pipe source("main.js")
      .pipe gulp.dest "#{buildDir}/js"

  bundler.on("update", bundle)
  bundle()

gulp.task "html", ->
  gulp.src paths.html
    .pipe gulp.dest "#{buildDir}"

gulp.task "libs", ->
  gulp.src paths.libs
    .pipe gulp.dest "#{buildDir}/libs"

gulp.task "styles", ["clean:sass"], ->
  gulp.src paths.styles
    .pipe sourcemaps.init()
      .pipe sass()
      .pipe concat "main.css"
      .pipe pleeease
        autoprefixer: {browsers: ["last 2 versions", "ios 7"]}
        opacity: false
        sourcemap: true
    .pipe sourcemaps.write()
    .pipe gulp.dest "#{buildDir}/css"

gulp.task "images", ["clean:images"], ->
  gulp.src "src/images/**/*"
    .pipe imagemin
      progressive: true
      optimizationLevel: 3
    .pipe gulp.dest "#{buildDir}/images"

gulp.task "watch", ->
  gulp.watch paths.html, ["html"]
  gulp.watch paths.styles, ["styles"]
  gulp.watch paths.images, ["images"]
  gulp.watch paths.scripts, ["browserify"]

gulp.task "default", [
  "html", "browserify",
  "styles", "images", "libs"]

gulp.task "watchers", ["watchify", "watch"]