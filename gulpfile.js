var meta      = require('./package.json'),
    del       = require('del'),
    bower     = require('gulp-bower'),
    cache     = require('gulp-cached'),
    concat    = require('gulp-concat'),
    csslint   = require('gulp-csslint'),
    cssmin    = require('gulp-cssmin'),
    gulp      = require('gulp'),
    jshint    = require('gulp-jshint'),
    uglify    = require('gulp-uglify'),
    watch     = require('gulp-watch');


var scripts = [
  'bower_components/jquery-ui/jquery-ui.min.js',
  // 'bower_components/ngstorage/ngStorage.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  // 'bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js',
  'bower_components/jasny-bootstrap/js/offcanvas.js',

  'src/js/fl_ctrl.js',
  'src/js/fl_view.js'
];

var styles = [
  'bower_components/bootstrap/dist/css/bootstrap.min.css',
  'bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.min.css',
  // 'bower_components/wtf-forms/wtf-forms.css',
  'bower_components/font-awesome/css/font-awesome.min.css',
  'bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css',
  'src/css/fl_view.css'
]

var less = [
  'bower_components/bootstrap/less/bootstrap.less',
  'bower_components/jasny-bootstrap/less/offcanvas.less',
  'bower_components/font-awesome/less/font-awesome.less',
]

/*
 * Task combos
 */
gulp.task('css',     ['cssmin']);
gulp.task('js',      ['uglify']);
gulp.task('lint',    ['csslint', 'jshint']);
gulp.task('make',    ['cssmin', 'uglify']);
gulp.task('makedev', ['cssconc', 'jsconc']);
gulp.task('travis',  ['csslint', 'jshint']);


gulp.task('init', ['bower'], function() {

  gulp.src([
    'bower_components/apache-server-configs/dist/.htaccess'
  ])
  .pipe(gulp.dest('.'));

  gulp.src([
    'bower_components/jquery/dist/jquery.min.js'
  ])
  .pipe(gulp.dest('dist/js/'));

  gulp.src([
    'bower_components/font-awesome/fonts/*'
    // 'bower_components/fira/eot/FiraSans-Light.eot',
    // 'bower_components/fira/ttf/FiraSans-Light.ttf',
    // 'bower_components/fira/woff/FiraSans-Light.woff'
  ])
  .pipe(gulp.dest('dist/fonts/'));

  gulp.src([
    'bower_components/jquery-ui/themes/smoothness/images/*'
  ])
  .pipe(gulp.dest('dist/css/images/'));

});


gulp.task('bower', function() {
  return bower()
});


gulp.task('clean', function () {
    return
    del([
      'dist/'
    ])
});


/*
 * LINT CSS
 */
gulp.task('csslint', function() {
  return gulp.src([
    'src/css/fl_view.css'
  ])
  .pipe(cache('linting'))
  .pipe(csslint({
    // .panel-fullscreen requires !important
    'important': false
  }))
  .pipe(csslint.formatter())

});


gulp.task('cssmin', ['csslint'], function() {

  gulp.src(styles)
  .pipe(concat('fl_ed.min.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('dist/css/'))

});


gulp.task('jshint', function() {

  return gulp.src([
    'src/js/fl_ctrl.js',
    'src/js/fl_view.js'
  ])
  .pipe(cache('linting'))
  .pipe(jshint())
  .pipe(jshint.reporter())

});


gulp.task('uglify', ['jshint'], function() {

  gulp.src(scripts)
  .pipe(uglify())
  .pipe(concat('fl_ed.min.js'))
  .pipe(gulp.dest('dist/js/'))

});

gulp.task('cssconc', function() {

  gulp.src(styles)
  .pipe(concat('fl_ed.min.css'))
  .pipe(gulp.dest('dist/css/'))

});

gulp.task('jsconc', function() {

  gulp.src(scripts)
  .pipe(concat('fl_ed.min.js'))
  .pipe(gulp.dest('dist/js/'))

});

// Watch task
gulp.task('watch', function () {
   gulp.watch([
            scripts,
            styles
         ],
         ['lint'])
});