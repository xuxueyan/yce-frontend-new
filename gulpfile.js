/**
 * @desc: gulp配置文件
 * @author: Mark
 */

var source = 'src/',
    develop = 'dist/';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');


gulp.task('jsmin', function(){

    gulp.src('src/**/*.js')
        .pipe(uglify({
            mangle: {except: ['$scope', '$rootScope', 'atomicNotifyService', '$http', '$timeout']}
        }))
        .pipe(gulp.dest('dist/'));
});
gulp.task('html', function(){

    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));

});
gulp.task('clean', function(){

    gulp.src('dist/*')
        .pipe(clean());
});