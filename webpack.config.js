var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve('./app'),
  entry: './js/app.js',
  output: {
    path: path.resolve('./dist/'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: "css-loader!sass-loader",
        })
      }
    ],
    devtool: 'source-map',
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      sourceType: 'module',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    },{
      test: /\.html$/,
      loader: 'html'
    },{
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    },{
      test: /\.css$/,
      loaders: ["style", "css"]
    },{
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
    },{
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file?name=fonts/[name].[ext]"
    },{
      test: /\.(jpe?g|png|gif)$/,
      loader:'file?name=img/[name].[ext]'
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new CleanWebpackPlugin(['dist']),
    new BrowserSyncPlugin({
      server: {
        baseDir: ['dist']
      },
      port: 3000,
      host: 'localhost'
    }),
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      { from: './*.html' },
      { from: './*.php' },
      { from: './manifest.json' },
      { from: './manifest.webapp' },
      { from: './robots.txt' },
      { from: './images/**/*' },
      { from: './fonts/**/*' },
      { from: './custom-fonts/**/*' },
      { from: './videos/**/*' }
    ])
  ]
}
