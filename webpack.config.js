var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var conf = {
  entry: './app/scripts/app.js',
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
    modulesDirectories: ['bower_components', 'node_modules', 'scripts', 'templates', 'styles', 'images', 'ico']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html'
    })
  ]
};

module.exports = conf;
