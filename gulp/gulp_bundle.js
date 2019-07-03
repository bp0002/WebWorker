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

var entries_html     = [
    'src/index.html'
];

function gulp_html() {
    gulp.task(
        'copy-html',
        function() {
            return gulp.src(entries_html)
                .pipe(gulp.dest(`./build`));
        }
    );
}

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

function gulp_bundle_logic_webgl() {
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

function gulp_bundle_front() {
    gulp.task(
        'bundle_front',
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
const init = () => {
    gulp_html();
    gulp_bundle_front();
    gulp_bundle_logic();
    gulp_bundle_logic_webgl();
}

// ======================================
exports.init = init;