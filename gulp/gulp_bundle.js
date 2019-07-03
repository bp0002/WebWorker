var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var tsify       = require('tsify');

var targetPath  = 'build';
var entries_main     = [
    'src/front/main.ts'
];
var entries_logic     = [
    'src/logic/index.ts'
];
var entries_logic_webgl     = [
    'src/logic_webgl/index.ts'
];


function gulp_bundle_logic() {
    gulp.task(
        'bundle_logic',
        function () {
            return browserify({
                basedir: '.',
                debug: true,
                entries: entries_logic,
                cache: {},
                packageCache: {}
            })
            .plugin(tsify)
            .bundle()
            .pipe(source('index.js'))
            .pipe(gulp.dest(`./build/logic`))
        }
    );
}

function gulp_bundle_logic() {
    gulp.task(
        'bundle_logic_webgl',
        function () {
            return browserify({
                basedir: '.',
                debug: true,
                entries: entries_logic_webgl,
                cache: {},
                packageCache: {}
            })
            .plugin(tsify)
            .bundle()
            .pipe(source('index.js'))
            .pipe(gulp.dest(`./build/logic_webgl`))
        }
    );
}

function gulp_bundle() {
    gulp.task(
        'bundle',
        function () {
            return browserify({
                basedir: '.',
                debug: true,
                entries: entries_main,
                cache: {},
                packageCache: {}
            })
            .plugin(tsify)
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(`./build/front`))
        }
    );
}

//
gulp_bundle_logic();

// ======================================
exports.gulp_bundle = gulp_bundle;