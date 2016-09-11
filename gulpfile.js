/**
 * Created by yanhong on 2016-09-11.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglifyjs');


gulp.task('sass', function() {
    return gulp.src('./public/sass/main.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('./public/stylesheets/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "localhost:3000"
    });
});

gulp.task('watch',['browserSync', 'sass', 'uglify'], function() {
    gulp.watch('./public/sass/*.scss', ['sass']);
    gulp.watch('./views/*.jade', browserSync.reload);
    gulp.watch('./public/javascripts/*.js', ['uglify']);
});

gulp.task('uglify', function() {
    gulp.src('./public/javascripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});