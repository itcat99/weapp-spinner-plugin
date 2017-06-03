import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import path from 'path';

const devOutput = path.join(__dirname, 'example/spinner/');
const deployOutput = path.join(__dirname, 'dist/');

const Path = {
  js: path.join(__dirname, 'src/*.js'),
  css: path.join(__dirname, 'src/*.scss'),
  html: path.join(__dirname, 'src/*.html'),
  output: devOutput
}

gulp.task('js', () => {
  gulp.src(Path.js)
    .pipe(babel())
    .pipe(gulp.dest(Path.output));
});

gulp.task('css', () => {
  gulp.src(Path.css)
    .pipe(sass())
    .pipe(rename(function (path) {
      path.extname = ".wxss";
    }))
    .pipe(gulp.dest(Path.output));
});

gulp.task('html', () => {
  gulp.src(Path.html)
    .pipe(rename(function (path) {
      path.extname = ".wxml";
    }))
    .pipe(gulp.dest(Path.output));
});

gulp.task('watch', () => {
  gulp.watch(Path.js, ['js']);
  gulp.watch(Path.css, ['css']);
  gulp.watch(Path.html, ['html']);
});

/* deploy */
gulp.task('deploy', () => {
  let _path = Path;
  _path.output = deployOutput;

  gulp.src(_path.js)
    .pipe(babel())
    .pipe(gulp.dest(_path.output));

  gulp.src(_path.css)
    .pipe(sass())
    .pipe(rename(function (path) {
      path.extname = ".wxss";
    }))
    .pipe(gulp.dest(_path.output));

  gulp.src(_path.html)
    .pipe(rename(function (path) {
      path.extname = ".wxml";
    }))
    .pipe(gulp.dest(_path.output));
})

gulp.task('default', ['js', 'css', 'html','watch']);