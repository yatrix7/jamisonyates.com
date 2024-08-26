import autoprefixer from 'autoprefixer'
import { deleteAsync } from 'del'
import { dest, parallel, series, src } from 'gulp'
import minifyCSS from 'gulp-csso'
import postcss from 'gulp-postcss'

// deletes dist folder
async function clean() {
  await deleteAsync(['dist'])
}

// moves favicon into dist folder root
function favIcon() {
  return src('favicon.ico').pipe(dest('dist'))
}

// moves images into dist folder
function images() {
  return src('images/*.{svg,png}').pipe(dest('dist/images'))
}

// minifies and moves css into dist folder
function css() {
  return src('src/styles/index.css')
    .pipe(postcss([autoprefixer()]))
    .pipe(minifyCSS())
    .pipe(dest('dist/styles'))
}

// moves html into dist folder
function html() {
  return src('src/index.html').pipe(dest('dist'))
}

export default series(clean, parallel(css, html))
