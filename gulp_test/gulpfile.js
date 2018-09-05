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
// Gulp watch syntax
gulp.watch('files-to-watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function{
    ...
}); 
*/

// If you like to use preprocessing, install gulp-sass
    // npm install gulp-sass --save-dev
// Declare the requirement
var sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({  // This is for the reload of browser sync
        stream: true
    }))
});

// Lifereload, herefore install browser sync
    // npm install browser-sync --save-dev
// Import browser sync
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('watch', ['browserSync', 'sass'], function(){
    // sass is the defined task we defined before and would like to watch here
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Other watchers
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', browserSync.reload); 
});

// Concatinate and remove custom files
    // npm install gulp-useref --save-dev
var useref = require('gulp-useref');
gulp.task('useref', function(){
    return gulp.src('app/*.html')
      .pipe(useref())
      .pipe(gulp.dest('dist'))
  });

// Minify and uglify
  // npm install gulp-uglify --save-dev
// Other requires...
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
// Minify css
    // npm install gulp-cssnano
var cssnano = require('gulp-cssnano');

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Optimize images
    // npm install gulp-imagemin --save-dev
var imagemin = require('gulp-imagemin');

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin({
        // Setting interlaced to true
        interlaced: true
      }))
    .pipe(gulp.dest('dist/images'))
  });

// Cache your gulp data
  // npm install gulp-cache --save-dev
  var cache = require('gulp-cache');

  gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/images'))
  });

// Copy fonts to dist
  gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
  })

// Clean up generated files. This will delete your dist folder everytime before you deploy there
  // npm install del --save-dev
var del = require('del');

gulp.task('clean:dist', function() {
    return del.sync('dist');
  })

// Clear the cache
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})

// There is a small 'Problem' that gulp is running all tasks in parallel, so we can't create a single task
// for creating our build, therefore we need
    // npm install run-sequence --save-dev
var runSequence = require('run-sequence');
/*
// This is how the task works
gulp.task('task-name', function(callback) {
  runSequence('task-one', ['tasks','two','run','in','parallel'], 'task-three', callback);
});
*/
gulp.task('build', function (callback) {
    runSequence('clean:dist', 
        ['sass', 'useref', 'images', 'fonts'],
        callback
    )
})

// Now finally let's define our default task, the default will be executed, when you run gulp
gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
      callback
    )
  })


/*
Usually todo tasks:
    For Development
        Using Autoprefixer to write vendor-free CSS code
        Adding Sourcemaps for easier debugging
        Creating Sprites with sprity
        Compiling only files that have changed with gulp-changed
        Writing ES6 with Babel or Traceur
        Modularizing Javascript files with Browserify, webpack, or jspm
        Modularizing HTML with template engines like Handlebars or Swig
        Splitting the gulpfile into smaller files with require-dir
        Generating a Modernizr script automatically with gulp-modernizr
    For optimization
        Removing unused CSS with unCSS
        Further optimizing CSS with CSSO
        Generating inline CSS for performance with Critical
    JavaScript unit tests with gulp-jasmine
    deploy dist folder to production, using gulp-rync
*/