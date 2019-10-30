const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: './src/logic_webgl/index.ts',
    entry: {
        logic_webgl: './src/front/main.ts'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'webpack_build/front')
    },
    // devtool: 'inline-source-map',                                  // 告诉 webpack 提取这些 source map，并内联到最终的 文件 中。
    module: {
        rules:[ 
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    // mode: 'development',
    mode: 'production',
    // optimization: {
    //     usedExports: true
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/logic_webgl_vao/index.html',
        })
    ],
}