var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');


gulp.task('pug', function () {
   gulp.src('./dev/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copiCarpet', function () {
    gulp.src(['./fonts/**/*'])
    .pipe(gulp.dest('./dist/fonts/'));
    gulp.src(['./img/**/*'])
    .pipe(gulp.dest('./dist/img/'));
    gulp.src(['./js/**/*'])
    .pipe(gulp.dest('./dist/js/'));
})

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'copiCarpet'], function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
    gulp.watch("./dev/**/*.pug" , ['pug'])

});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: true
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
