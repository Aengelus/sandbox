var gulp = require('gulp');

/*
// If you use 'gulp task-name' you can run a specific task in the console
gulp.task('task-name', function(){
    console.log('Hello world');
});

// Example task
gulp.task('task-name', function () {
    return gulp.src('source-files') // Get source files with gulp.src
    .pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
})
*/

// If you like to use preprocessing, install gulp-sass
    // npm install gulp-sass --save-dev
// Declare the requirement
var sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
      .pipe(sass()) // Using gulp-sass
      .pipe(gulp.dest('app/css'))
  });