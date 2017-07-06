//List of task loaded by Gulp, this is required to access the installed tasks.
var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
const jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var dest = require('gulp-dest');

/*---------------------------------------------DEV Compiling and Validating Taks---------------------------------------------*/
//Processess SASS into CSS.
gulp.task('sassCSS', function () {
	return gulp.src('dev/sass/styles.scss') //Sass source file.
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dev/css')); //Output CSS file.
});

//Copy bootstrap Fonts
gulp.task('copyBSFonts', function () {
	gulp.src('node_modules/bootstrap/dist/fonts/**/*')
		.pipe(gulp.dest('dev/fonts'));
});

//Concatenates Files on Selected Folders.
gulp.task('concatBundleCSS', function () {
	return gulp.src(['node_modules/normalize.css/normalize.css', 'node_modules/bootstrap/dist/css/bootstrap.css']) //Concatenates the css vendor files.
		.pipe(concat('bundle.css')) //Main js file.
		.pipe(gulp.dest('dev/css')); //Destination folder
});

gulp.task('concatBundleJS', function () {
	return gulp.src(['node_modules/jquery/dist/jquery.js', 'ode_modules/bootstrap/dist/js/bootstrap.js']) //Concatenates the js user generated files.
		.pipe(concat('bundle.js')) //Main js file.
		.pipe(gulp.dest('dev/js')); //Destination folder
});

gulp.task('concatJS', function () {
	return gulp.src(['dev/js/components/*.js', 'dev/js/global/*.js']) //Concatenates the js user generated files.
		.pipe(concat('main.js')) //Main js file.
		.pipe(gulp.dest('dev/js')); //Destination folder
});

//JSHint for Main JS files.
gulp.task('jsHint', function () {
	const stylish = require('jshint-stylish');
	const pkg = require('./package');
	const jshintConfig = pkg.jshintConfig; //Loads JSHint options from package.json
	jshintConfig.lookup = false;
	return gulp.src(['dev/js/components/*.js', 'dev/js/global/*.js'])
		.pipe(jshint(jshintConfig))
		.pipe(jshint.reporter('jshint-stylish')); //Reporter for JSHint, shows up errors on a stylish way.
});

/*---------------------------------------------DEV Compiling and Validating Taks---------------------------------------------*/

/*---------------------------------------------Prod Build Compiling Tasks---------------------------------------------*/
//This tasks will minify and copy all Project files to the dist folder, this will create a cleaner version to deploy to PROD environment.

//Minifies JS files for better performance
//JS Vendor generated files files --> main.js.
gulp.task('minifyBundleJS', ['cleanDist'], function (cb) {
	pump([
        gulp.src('dev/js/bundle.js'), //Source file
        uglify(),
        gulp.dest('dist/js') //Destination file main.js
    ],
		cb
	);
});

//JS user generated files files --> main.js.
gulp.task('minifyJS', ['cleanDist'], function (cb) {
	pump([
        gulp.src('dev/js/main.js'), //Source file
        uglify(),
        gulp.dest('dist/js') //Destination file main.js
    ],
		cb
	);
});

//Minifies CSS Vendor files
gulp.task('minifyBundleCSS', ['cleanDist'], () => {
	return gulp.src('dev/css/bundle.css') //Source file
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('dist/css')); //Destination file styles.css
});

//Minifies CSS User Generated files
gulp.task('minifyCSS', ['cleanDist'], () => {
	return gulp.src('dev/css/styles.css') //Source file
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('dist/css')); //Destination file styles.css
});

//Clean the dist folder to avoid issues on production code
gulp.task('cleanDist', [], function () {
	return del(['dist/**/*']); //Erase dist folder contents
});

//Copy minified and global files to the dist folder
gulp.task('copyHTML', ['cleanDist'], function () {
	gulp.src('dev/*.html')
		.pipe(gulp.dest('dist/'));

	gulp.src('dev/html/**/*')
		.pipe(gulp.dest('dist/html'));
});

gulp.task('copyIMG', ['cleanDist'], function () {
	gulp.src('dev/img/**/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('copyMedia', ['cleanDist'], function () {
	gulp.src('dev/media/**/*')
		.pipe(gulp.dest('dist/media'));
});

gulp.task('copyFonts', ['cleanDist'], function () {
	gulp.src('dev/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	gulp.src('node_modules/bootstrap/dist/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
});

/*---------------------------------------------Prod Build Compiling Tasks---------------------------------------------*/

/*---------------------------------------------Misc Taks---------------------------------------------*/
//Creates and Connects a Local Server for both DEV and Dist folders
gulp.task('connectDev', function () {
	//Dev Server --> https://localhost:3000
	connect.server({
		name: 'Dev App',
		root: 'dev',
		port: 3010,
		livereload: true
	});
});

gulp.task('connectDist', function () {
	//Prod Server --> https://localhost:3001
	connect.server({
		name: 'Dist App',
		root: 'dist',
		port: 3020,
		livereload: true
	});
});

//This Task will livereload the index page.
gulp.task('liveReloadDev', function () {
	gulp.src('dev/*.html')
		.pipe(connect.reload());

	gulp.src('dev/**/*.html')
		.pipe(connect.reload());
});

gulp.task('liveReloadProd', function () {
	gulp.src('dist/*.html')
		.pipe(connect.reload());

	gulp.src('dist/**/*.html')
		.pipe(connect.reload());
});

//This Taks is the Watcher of any file changes, this task will wait for changes and apply the selected tasks to the files on dev environment
gulp.task('watchDev', function () {
	gulp.watch(['dev/*.html', 'dev/**/*.html'], ['liveReloadDev']);

	gulp.watch(['dev/sass/**/*.scss'], ['sassCSS', 'liveReloadDev']);
	gulp.watch(['dev/js/components/**/*.js', 'dev/js/global/**/*.js'], ['jsHint', 'concatJS', 'liveReloadDev']);
});

//This Taks is the Watcher of any file changes, this task will wait for changes and apply the selected tasks to the files on dist environment
gulp.task('watchDist', function () {
	gulp.watch(['dev/*.html', 'dev/**/*.html'], ['copyHTML', 'liveReloadProd']);
	gulp.watch(['dev/img/**'], ['copyIMG', 'liveReloadProd']);
	gulp.watch(['dev/media/**'], ['copyMedia', 'liveReloadProd']);
	gulp.watch(['dev/fonts/**'], ['copyFonts', 'liveReloadProd']);

	gulp.watch(['dev/sass/**/*.scss'], ['sassCSS', 'minifyCSS', 'liveReloadProd']);
	gulp.watch(['dev/js/components/**/*.js', 'dev/js/global/**/*.js'], ['jsHint', 'concatJS', 'minifyJS', 'liveReloadProd']);
});

/*---------------------------------------------Misc Taks---------------------------------------------*/

//List of task to Run via CMD or Internal Gulp Loader
gulp.task('devBuild', ['sassCSS', 'copyBSFonts', 'concatBundleCSS', 'concatJS', 'concatBundleJS', 'jsHint', 'connectDev', 'watchDev']);
gulp.task('distBuild', ['cleanDist', 'sassCSS', 'concatBundleCSS', 'concatJS', 'concatBundleJS', 'minifyJS', 'minifyBundleJS', 'minifyCSS', 'minifyBundleCSS', 'copyHTML', 'copyIMG', 'copyMedia', 'copyFonts', 'connectDist', 'watchDist']);
