var webpack = require('webpack'),
    path = require('path'),
    WebpackCleanupPlugin  = require('webpack-cleanup-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function() {
    return {
        module:{
            rules: [
                {test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
                {test: /\.ts$/, use: 'ts-loader'}
            ]
        },
        entry: {
            css: "./app/style.css",
            main: './app/index.js'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.ProvidePlugin({
                d3: '../node_modules/d3',
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                   // this assumes your vendor imports exist in the node_modules directory
                   return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
            new webpack.optimize.CommonsChunkPlugin({ 
                name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
            }),
            new HtmlWebpackPlugin({
                template:"index.html",
                inject:"head"
            }),
            new WebpackCleanupPlugin({
                exclude: [],
            })
        ]
    };
}