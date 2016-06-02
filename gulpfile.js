const gulp = require('gulp')
// css prefixing, postfixing, etc
const nib = require('nib')
const mq = require('css-mqpacker')
const autoprefixer = require('autoprefixer')

// all gulp modules are now properties under $
// gulp-util becomes $.util, etc
// all gulp tasks now only load on demand
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /^gulp(-|\.)/,
  camelize: true, // transforms hyphenated plugins names to camel case
  lazy: true, // lazy load plugins on demand
  rename: {
    'gulp-sourcemaps': 'maps',
  },
})

/**
 * compiles, autoprefixes, minifies the stylus
 */
gulp.task('stylus', function () {
  return gulp.src('./css/app.styl')
    .pipe($.stylus({
      compress: true,
      use: [nib()]
    }))
    .pipe($.postcss([
      autoprefixer({
        browsers: ['> 0.5%', 'ie >= 8']
      }),
      mq,
    ]))
    .pipe(gulp.dest('./css/build'))
})

/**
 * @TODO @Matt we'll need to incorporate this into the build
 * it's fine to use un-minified / whatever css in develop
 * but on deploy we only want the css actually used
 * uncss crawls our html in public/ and spits out a css
 * file that is minified and only contains
 * selectors that are actually used
 */
gulp.task('uncss', function () {
  return gulp.src('./css/build/app.css')
    .pipe($.uncss({
      html: ['public/**/*.html']
    }))
    .pipe($.cssnano())
    .pipe(gulp.dest('./css/build'))
})

gulp.task('watch', () => gulp.watch('./css/**/*.styl', ['stylus']))
gulp.task('default', ['stylus', 'watch'])
