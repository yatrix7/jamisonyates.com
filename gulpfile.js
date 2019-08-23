const { src, dest, series, parallel } = require('gulp')
const del = require('del')
const minifyCSS = require('gulp-csso')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')

// deletes dist folder
async function clean() {
	await del(['dist'])
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
	return src('src/styles/*.css')
		.pipe(postcss([autoprefixer()]))
		.pipe(minifyCSS())
		.pipe(dest('dist/styles'))
}

// moves html into dist folder
function html() {
	return src('src/*.html').pipe(dest('dist'))
}

exports.default = series(clean, parallel(css, favIcon, images, html))
