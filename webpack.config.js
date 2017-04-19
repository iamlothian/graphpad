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
            main: './app/index.ts'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.ProvidePlugin({
                'd3': "../node_modules/d3",
                'd3-axis': "../node_modules/d3-axis",
                'd3-array': "../node_modules/d3-array",
                'd3-brush': "../node_modules/d3-brush",
                'd3-chord': "../node_modules/d3-chord",
                'd3-collection': "../node_modules/d3-collection",
                'd3-color': "../node_modules/d3-color",
                'd3-dispatch': "../node_modules/d3-dispatch",
                'd3-drag': "../node_modules/d3-drag",
                'd3-dsv': "../node_modules/d3-dsv",
                'd3-ease': "../node_modules/d3-ease",
                'd3-force': "../node_modules/d3-force",
                'd3-format': "../node_modules/d3-format",
                'd3-geo': "../node_modules/d3-geo",
                'd3-hierarchy': "../node_modules/d3-hierarchy",
                'd3-interpolate': "../node_modules/d3-interpolate",
                'd3-path': "../node_modules/d3-path",
                'd3-polygon': "../node_modules/d3-polygon",
                'd3-quadtree': "../node_modules/d3-quadtree",
                'd3-queue': "../node_modules/d3-queue",
                'd3-random': "../node_modules/d3-random",
                'd3-request': "../node_modules/d3-request",
                'd3-scale': "../node_modules/d3-scale",
                'd3-selection': "../node_modules/d3-selection",
                'd3-shape': "../node_modules/d3-shape",
                'd3-time': "../node_modules/d3-time",
                'd3-time-format': "../node_modules/d3-time-format",
                'd3-timer': "../node_modules/d3-timer",
                'd3-transition': "../node_modules/d3-transition",
                'd3-voronoi': "../node_modules/d3-voronoi",
                'd3-zoom': "../node_modules/d3-zoom",
                'lodash': "../node_modules/lodash",
                'fabric': "../node_modules/fabric/dist/fabric.require.js"
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