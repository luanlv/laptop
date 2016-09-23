var gulp        = require('gulp');
//var sass        = require('gulp-sass');
var sass = require('gulp-ruby-sass');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var optimizeJs = require('optimize-js');
var gulpif = require('gulp-if');
var jsmin = require('gulp-jsmin');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var autoprefixer = require('gulp-autoprefixer');
var run = require('gulp-run');

// Registering a 'less' task that just compile our LESS files to CSS

var localhost = new run.Command('curl http://localhost:9000');

gulp.task('sass', function () {
  return sass('_frontend/scss/*.scss')
      .on('error', sass.logError)
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      // .pipe(cleanCSS())
      // .pipe(rename('style.min.css'))
      .pipe(rename('style.css'))
      // .pipe(gulp.dest('public/stylesheets'));
      .pipe(gulp.dest('file/'));
});

gulp.task('app', function() {
  var cmd = new run.Command('optimize-js ./file/app-tmp.js > ./file/app.js');
  gulp.src('_frontend/app/main.msx')
      .pipe(browserify({
        transform: ['mithrilify']
      }))
      .pipe(rename('app-tmp.js'))
      .pipe(minify({}))
      .pipe(gulp.dest('file/'))
      .on('end', function(){
        cmd.exec('');
      });
});

gulp.task('admin', function() {
  var cmd = new run.Command('optimize-js ./file/admin-tmp.js > ./file/admin.js');
  gulp.src('_frontend/admin/main.msx')
      .pipe(browserify({
        transform: ['mithrilify']
      }))
      .pipe(rename('admin-tmp.js'))
      // .pipe(gulp.dest('public/js/'))
      .pipe(gulp.dest('file/'))
      .on('end', function(){
        cmd.exec('');
      });
});


//
gulp.task('serve', function () {
  browserSync({
    // By default, Play is listening on port 9000
    proxy: 'localhost:9000',
    // We will set BrowserSync on the port 9001
    port: 9001,
    // Reload all assets
    // Important: you need to specify the path on your source code
    // not the path on the url
    files: ['public/stylesheets/*.css',
      'public/javascripts/*.js',
      'app/views/{,*/}*.html',
      'app/views/{,*/}{,*/}*.html',
      'app/views/{,*/}/{,*/}{,*/}*.html',
      'app/views/{,*/}*.stream',
      'app/controllers/{,*/}*.scala',
      'conf/routes',
    ],
    open: false
  });
});

gulp.task('watcher', ['app'], function () {
  gulp.watch('_frontend/app/{,*/}{,*/}{,*/}{,*/}*.msx', ['app']);
  gulp.watch('_frontend/app/{,*/}{,*/}{,*/}{,*/}*.js', ['app']);
  gulp.watch('_frontend/scss/{,*/}*.scss', ['sass']);
  gulp.watch('_frontend/admin/{,*/}{,*/}{,*/}{,*/}*.msx', ['admin']);
  gulp.watch('_frontend/admin/{,*/}{,*/}{,*/}{,*/}*.js', ['admin']);
});



// Creating the default gulp task
gulp.task('default', [ 'sass', 'app', 'admin', 'watcher', 'serve']);