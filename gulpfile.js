var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('hello', function(){
    console.log("Hello world");
});

// Compile sass
gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')      // Get all scss files
        .pipe(sass())                            // Using gulp-sass
        .pipe(gulp.dest('app/css'))              // Destination for generated css
        .pipe(browserSync.reload({               // Browser refresh on every change
            stream: true
        }))
});

// Watch for any scss file change and on every change run the sass task defined
// above
gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('app/scss/**/*.scss', ['sass']); 
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', browserSync.reload); 
})

// Sync browser changes
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

// Concatenate all js scripts into one main script
// and minify
gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpif('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

// Minify images
gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin()))                // cache - Cache optimezed images to save time
    .pipe(gulp.dest('dist/images'))
});

// Copy the fonts from app to dist
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Clean the dist directory
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

// Group more tasks together into one task with sequence
gulp.task('build', function (callback) {
    runSequence('clean:dist', 
        ['sass', 'useref', 'images', 'fonts'],
        callback
    )
})

gulp.task('default', ['hello']);
