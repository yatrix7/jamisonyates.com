const { src, dest, series, parallel } = require('gulp')
const del = require('del')
const minifyCSS = require('gulp-csso')

// deletes public folder
async function clean() {
	await del(['public'])
}

// minifies and moves css into public folder
function css() {
	return src('css/*.css')
		.pipe(minifyCSS())
		.pipe(dest('public/styles'))
}

// moves html into public folder
function html() {
	return src(['html/*.html']).pipe(dest('public'))
}

exports.default = series(clean, parallel(css, html))
