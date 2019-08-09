const { src, dest, series, parallel } = require('gulp')
const clean = require('gulp-clean')
const minifyCSS = require('gulp-csso')

// deletes dist folder
function cleanDist() {
	return src('dist', {
		read: false,
		allowEmpty: true
	}).pipe(clean())
}

// minifies and moves css into dist folder
function css() {
	return src('styles/*.css')
		.pipe(minifyCSS())
		.pipe(dest('dist/styles'))
}

// moves html into dist folder
function html() {
	return src(['html/*.html']).pipe(dest('dist/html'))
}

exports.default = series(cleanDist, parallel(css, html))
