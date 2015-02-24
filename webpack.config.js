var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProvidePlugin = webpack.ProvidePlugin;
var ResolverPlugin = webpack.ResolverPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var conf = {
  entry: {
    app: './app/scripts/app.js',
    vendor: [
      'jquery',
      'flight',
      'hogan.js',
      'normalize-css'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[hash].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.hgn$/,
        loader: 'mustache'
      },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'
      },
      {
        test: /\.css$/,
        loader: 'style!css!autoprefixer?browsers=last 2 version'
      },
      {
        test: /\.(jpg|jpeg)$/,
        loader: 'file' //?name=[name].[ext]' // prevents from long term caching
      },
      {
        test: /\.png$/,
        loader: 'url?mimetype=image/png'
      },
      {
        test: /favicon.ico$/,
        loader: 'file?name=favicon.ico'
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'bower_components',
      'node_modules',
      'scripts',
      'templates',
      'styles',
      'images'
    ]
  },
  plugins: [
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ResolverPlugin([
      new ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html'
    }),
    new CommonsChunkPlugin('vendor', '[hash].vendor.bundle.js')
  ]
};

module.exports = conf;
