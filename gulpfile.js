// const syntax = 'sass'; // Syntax: sass or scss;

// const gulp = require('gulp');
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const browserSync = require('browser-sync').create();
// const sourcemaps = require('gulp-sourcemaps');
// const gcmq = require('gulp-group-css-media-queries');
// const sass = require('gulp-sass');
// const notify = require("gulp-notify");
// const rename = require('gulp-rename');
// const concat  = require('gulp-concat');


// const config = {
//    src: 'app/',
//    css: {
//       src: 'sass/**/*.' + syntax + '',
//       dest: 'css',
//       srcMain: 'sass/**/main.' + syntax + '',
//    },
//    html: '*.html'
// };

// gulp.task('styles', function () {
//    return gulp.src(config.src + config.css.srcMain)
//       .pipe(sourcemaps.init())
//       .pipe(sass({
//          outputStyle: 'expanded'
//       }).on("error", notify.onError()))
//       .pipe(rename({
//          suffix: '.min',
//          prefix: ''
//       }))
//       .pipe(autoprefixer(['last 15 versions']))
//       .pipe(gcmq())
//       .pipe(cleanCSS())
//       .pipe(sourcemaps.write('.'))
//       .pipe(gulp.dest(config.src + config.css.dest))
//       .pipe(browserSync.stream())
// });

// gulp.task('browser-sync', function () {
//    browserSync.init({
//       server: {
//          baseDir: 'app/'
//       }
//    });
// });

// gulp.task('code', function () {
//    return gulp.src(config.src + config.html)
//       .pipe(browserSync.stream())
// });
// gulp.task('js', function () {
//    return gulp.src([
//          // 'src/libs/jquery/dist/jquery.min.js',
//          'app/js/app.js' // Always at the end
//       ])
//       .pipe(concat('scripts.min.js'))
//       // .pipe(uglify()) // Mifify js (opt.)
//       .pipe(gulp.dest('app/js'))
//       .pipe(browserSync.reload({
//          stream: true
//       }))
// });

// gulp.task('watch', function () {
//    gulp.watch(config.src + config.css.src, gulp.parallel('styles'));
//    gulp.watch(config.src + config.html, gulp.parallel('code'));
//    gulp.watch('src/js/app.js', gulp.parallel('js'));
// });

// gulp.task('default', gulp.parallel('styles', 'watch', 'browser-sync'));




const syntax = 'sass'; // Syntax: sass or scss;

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const sass = require('gulp-sass');
const notify = require("gulp-notify");
const rename = require('gulp-rename');
const concat = require('gulp-concat');


const config = {
   src: 'app/',
   dist: 'dist/',
   img: {
      src: 'img/**/*.*',
      dest: 'img'
   },
   css: {
      src: 'sass/**/*.' + syntax + '',
      dest: 'css',
      srcMain: 'sass/**/main.' + syntax + '',
   },
   html: '*.html'
};

gulp.task('styles', function () {
   return gulp.src(config.src + config.css.srcMain)
      .pipe(sourcemaps.init())
      .pipe(sass({
         outputStyle: 'expanded'
      }).on("error", notify.onError()))
      .pipe(rename({
         suffix: '.min',
         prefix: ''
      }))
      .pipe(autoprefixer(['last 15 versions']))
      .pipe(gcmq())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.src + config.css.dest))
      .pipe(browserSync.stream())
});

gulp.task('browser-sync', function () {
   browserSync.init({
      server: {
         baseDir: 'app/'
      }
   });
});

gulp.task('code', function () {
   return gulp.src(config.src + config.html)
      .pipe(browserSync.stream())
});
// gulp.task('js', function () {
//    return gulp.src('app/js/app.js')
//       .pipe(gulp.dest('app/js'))
//       .pipe(browserSync.reload({
//          stream: true
//       }))
// });

gulp.task('watch', function () {
   gulp.watch(config.src + config.css.src, gulp.parallel('styles'));
   gulp.watch(config.src + config.html, gulp.parallel('code'));
   // gulp.watch('app/js/app.js', gulp.parallel('js'));
});

gulp.task('imgmin:build', function () {
   return gulp.src(config.src + config.img.src)
      .pipe(gulp.dest(config.dist + config.img.dest))
})

gulp.task('html:build', function () {
   return gulp.src(config.src + config.html)
      .pipe(gulp.dest(config.dist))
})

gulp.task('styles:build', function () {
   return gulp.src(config.src + config.css.srcMain)
      .pipe(sourcemaps.init())
      .pipe(sass({
         outputStyle: 'expanded'
      }).on("error", notify.onError()))
      .pipe(rename({
         suffix: '.min',
         prefix: ''
      }))
      .pipe(autoprefixer(['last 15 versions']))
      .pipe(gcmq())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.dist + config.css.dest))
      .pipe(browserSync.stream())
});



gulp.task('default', gulp.parallel('styles', 'watch', 'browser-sync'));
gulp.task('build', gulp.parallel('html:build', 'styles:build', 'imgmin:build'));