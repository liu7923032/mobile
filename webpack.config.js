var webpack = require('webpack')


//独立样式文件
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

var path = require('path')

module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: './dist',
        publicPath: 'dist/',
        filename: 'dist.js'
    },
    resolve: {
        root: path.resolve('./'),
        extension: ['', '.js']
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            // edit this for additional asset file types
            test: /\.(png|jpg|gif)$/,
            loader: 'file?name=[name].[ext]?[hash]'
        }, {
            // edit this for additional asset file types
            test: /\.js$/,
            exclude: /node_modules|vue\/dist/,
            loader: 'babel'
        },{ 
            test: /\.css$/, loader: 'style!css'
        }]
    },
    // example: if you wish to apply custom babel options
    // instead of using vue-loader's default:
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    plugins:[]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}
