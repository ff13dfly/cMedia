//help:https://www.cnblogs.com/2050/p/4198792.html
//npm install --save-dev gulp-uglify
//npm install --save-dev gulp-concat
//npm install --save-dev gulp-jshint

//后面可以考虑直接用hbuilderX
//用这个文件处理下git同步看，really?

var gulp = require('gulp');
//var jshint = require("gulp-jshint");
//var babel = require("gulp-babel");
var uglify = require("gulp-uglify-es").default;
var concat = require('gulp-concat');

//目标配置
var target = './';
var min = 'cMedia.min.js';
var source = [
    'lib/core.js',
    'lib/uploader.js',          //uploader lib
    'lib/common.js',            //common method
    'lib/tpl.js',               //basic theme
    'pages/index.js',
    //'pages/view.js',
    //'pages/history.js',
    //'pages/write.js',
    //'pages/auth.js',
    //'pages/board.js',
];
var opt = {
    mangle: {
        toplevel: true,
    },
    // output:{
    //     beautify: false,
    //     comments: false,
    //     preamble: "/* cMedia Anchor cApp */"
    // },
    // compress: {
    //     drop_console: true
    // },
};

gulp.task('default', function() {
    gulp.src(source) // 要压缩的js文件
        //.pipe(uglify(opt)) //使用uglify进行压缩,更多配置请参考：
        .pipe(concat(min)) //压缩成一个js文件
        .pipe(gulp.dest(target)); //压缩后的路径'dist/js'
    return new Promise((resolve, reject) => {
        resolve('success');
    });
});