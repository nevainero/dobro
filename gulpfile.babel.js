
var paths = {
	input: "src/",
	output: "build/",
	jsFiles: {
		filesToConcat: ["src/js/*.js"],
		filesToLint: ["src/js/*.js"],
		output: "build/js"
	},
	styles: {
		input: "src/sass/**/*.{scss,sass}",
		output: "build/"
	},
	thehtmls: {
		input: "src/html/*.html",
		output: "build/"
	},
	staticFiles: {
		input: [
			"src/assets/**/*",
			"src/uploads/**/*",
		],
		output: "build/"
	},
	reload: "./build/"
};


var { gulp, src, dest, watch, series, parallel } = require("gulp");
var del = require("del");
// var package = require("./package.json");
var fileinclude = require("gulp-file-include");
var tokenReplace = require("gulp-token-replace");
var htmlbeautify = require("gulp-html-beautify");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");
var concat = require("gulp-concat");
var minify = require("gulp-minify");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync");


var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rollup = require('@rollup/stream');


import babel from '@rollup/plugin-babel';

// Add support for require() syntax
var commonjs = require('@rollup/plugin-commonjs');

// Add support for importing from node_modules folder like import x from 'module-name'
var nodeResolve = require('@rollup/plugin-node-resolve');

// Cache needs to be initialized outside of the Gulp task 
var cache;


// Remove pre-existing content from output folders
exports.cleanup = function (done) {
	// Clean the build folder
	del.sync([paths.output]);

	// Signal completion
	return done();
};


// Copy static files from src to build
var copyStaticFilesTask = function (done) {
	return src(paths.staticFiles.input, { base: "./src/" }).pipe(
		dest(paths.staticFiles.output)
	);
};

var jsTask = function (done) {

	// if (!paths.jsFiles.filesToConcat.length) return done(); // Cancel if no js files

	return rollup({
			input: './src/js/index.js',

			// plugins: [babel(), commonjs(), nodeResolve()],
			plugins: [
					babel({ 
						babelHelpers: 'bundled',
						presets: ['@babel/preset-env'],
						exclude: 'node_modules/**'
					}), 
					commonjs(), 
					nodeResolve.nodeResolve()
			],

			sourcemap: false, // Enable source maps support

			cache: cache, // Use cache for better performance

			// Note: these options are placed at the root level in older versions of Rollup
			output: {

			// Output bundle is intended for use in browsers
			// (iife = "Immediately Invoked Function Expression")
			  format: 'iife',
			// format: 'esm',

			name: 'ae'
  
		},
  
		// Output bundle is intended for use in browsers
		format: 'iife',
	  })

	  .on('bundle', function(bundle) {
		cache = bundle; // Update cache data after every bundle is created
	  })

	  .pipe(source('bundle.js')) // Name of the output file.
	  .pipe(buffer())
  
	  // The use of sourcemaps here might not be necessary, 
	  // Gulp 4 has some native sourcemap support built in
	//   .pipe(sourcemaps.init({loadMaps: true}))
	//   .pipe(sourcemaps.write('.'))
   
	  // Where to send the output file
	  .pipe(dest('./build/js'));

	// return src(paths.jsFiles.filesToConcat)
	// 	.pipe(concat("main.js"), {
	// 		allowEmpty: true
	// 	})
	// 	.pipe(
	// 		minify({
	// 			mangle: false
	// 		})
	// 	)
	// 	.pipe(dest(paths.jsFiles.output));

};

// Lint scripts
// var lintScriptsTask = function (done) {

// 	// Cancel if no js files
// 	if (!paths.jsFiles.filesToLint) return done();

// 	// Lint scripts
// 	return src(paths.jsFiles.filesToLint)
// 		.pipe(jshint({
// 			esversion: 6,
// 		}))
// 		.pipe(jshint.reporter("jshint-stylish"));

// };


// SASS
var stylesTask = function (done) {

	// Run tasks on all Sass files
	return src(paths.styles.input)
		.pipe(
			sass({
				outputStyle: "expanded",
				sourceComments: false,
				indentType: "tab",
				indentWidth: 1
			})
		)
		.pipe(
			autoprefixer({
				cascade: false
			})
		)
		.pipe(dest(paths.styles.output))
		.pipe(browserSync.stream());
};

// Generate HTMLs
var htmlTask = function (done) {

	var tokenReplaceConfig = require("./gulp_config/token-replace-config.js");

	return src(paths.thehtmls.input)
		.pipe(
			fileinclude({
				prefix: "@@",
				basepath: "@file"
			})
		)
		.pipe(tokenReplace({ global: tokenReplaceConfig }))
		.pipe(
			htmlbeautify({
				indentSize: 4,
				indent_with_tabs: true,
				preserve_newlines: true,
				max_preserve_newlines: 3,
				end_with_newline: true
			})
		)
		.pipe(dest(paths.thehtmls.output));
};



// Watch for changes to the src directory
var startServer = function (done) {
	// Initialize BrowserSync
	browserSync.init({
		server: {
			baseDir: paths.reload
		},
		notify: false
	});

	done();
};


// Reload the browser when files change
var reloadBrowser = function (done) {
	browserSync.reload();
	done();
};



// Watch for changes
var watchSource = function (done) {

	// Watch and copy all files except for static resources
	watch(paths.styles.input, series(exports.devTaskStyles));
	watch("src/html/**/*.html", series(exports.devTaskHtml, reloadBrowser));
	watch(paths.jsFiles.filesToConcat, series(exports.devTaskJs, reloadBrowser));

	// Watch static recources, if changes, then run build task, which copies all static files to build
	watch(paths.staticFiles.input, series(exports.build, reloadBrowser));

	done();
};

//  Development tasks that run when files are changed
exports.devTaskStyles = series(parallel(stylesTask));
exports.devTaskHtml = series(parallel(htmlTask));
exports.devTaskJs = series(parallel(jsTask));
// exports.devTaskJs = series(parallel(lintScriptsTask, jsTask));



// Build
exports.build = series(
	// cleanup,
	parallel(jsTask, stylesTask, htmlTask, copyStaticFilesTask)
	// parallel(lintScriptsTask, jsTask, stylesTask, htmlTask, copyStaticFilesTask)
);

// Watch and reload
exports.watch = series(exports.build, startServer, watchSource);

// Default task (same as watch)
exports.default = series(exports.build, startServer, watchSource);