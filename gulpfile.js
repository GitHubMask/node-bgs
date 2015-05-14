var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('serve_dev', function () {
  nodemon({
    script: 'bgs/bgs.js'
  , ext: 'js'
  , env: { 'NODE_ENV': 'development', 'INIT_TEST_DATA': 'true'}
  })
})
