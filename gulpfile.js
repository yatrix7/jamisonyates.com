const { src, dest, series, parallel } = require('gulp')
const del = require('del')
const minifyCSS = require('gulp-csso')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')

// deletes public folder
async function clean() {
	await del(['public'])
}

// moves images into public folder
function images() {
	return src('images/**.*').pipe(dest('public/images'))
}

// minifies and moves css into public folder
function css() {
	return (
		src('src/styles/*.css')
			.pipe(postcss([autoprefixer()]))
			// .pipe(minifyCSS())
			.pipe(dest('public/styles'))
	)
}

// moves html into public folder
function html() {
	return src('src/*.html').pipe(dest('public'))
}

exports.default = series(clean, parallel(css, images, html))
