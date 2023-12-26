const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const fileinclude = require("gulp-file-include");
const { series } = require("gulp");

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

function buildStyles() {
  return (
    gulp
      .src("src/scss/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      //.pipe(cssnasano())
      .pipe(gulp.dest("src/css"))
  );
}

function csstodist() {
  return gulp.src("src/css/*.css").pipe(cssnano()).pipe(gulp.dest("dist/css/"));
}

function fontstodist() {
  return gulp.src("src/font/*.*").pipe(gulp.dest("dist/font/"));
}

function htmlInclude() {
  return gulp
    .src("src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("dist"));
}

function imgmin() {
  return gulp
    .src("src/img/**/*.*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest("dist/img"));
}

// function libstoDest() {
//   return gulp.src("src/libs/**/*.*").pipe(gulp.dest("dist/libs/"));
// }

exports.default = defaultTask; // gulp
exports.scss = buildStyles;
exports.css = csstodist;
exports.html = htmlInclude;
exports.img = imgmin;
exports.font = fontstodist;
// exports.libs = libstoDest;
// exports.includehtml = include;

exports.dev = series(
  htmlInclude,
  buildStyles,
  csstodist,
  fontstodist,
    imgmin,
  //   libstoDest
);
