var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('hello', function(){
    console.log("Hello world");
});

// Compile sass
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')//Get all scss files
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
});

// Watch for any scss file change and on every change run the sass task defined
// above
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Other watchers
})

gulp.task('default', ['hello']);
