/*jslint node: true */
'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var I18nPlugin = require("i18n-webpack-plugin");
var languages = {
    "en": require("./app/locales/en.json"),
    "pl": require("./app/locales/pl.json")
};

// see all: https://github.com/webpack/webpack/tree/master/lib
var ProvidePlugin = webpack.ProvidePlugin;
var ResolverPlugin = webpack.ResolverPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var DefinePlugin = webpack.DefinePlugin;

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");

var metaAttributes = {
  "title": "this is title",
  "description": "this is description",
  "domain": "example.com",
  "keywords": [
    "cool",
    "site"
  ]
};

module.exports = [
    {
        //cache: true,
        debug: true,
        entry: {
            app_pl: "./app/scripts/app.js",
            vendor: [
              'jquery',
              'flight',
              'hogan.js',
              'normalize-css',
              'es6-promise',
              'fetch'//,
              //'font-awesome-webpack'
            ]
        },
        output: {
          path: path.join(__dirname, 'dist/[hash]/'),
          filename: '[name]_bundle-[chunkhash].js',
          publicPath: "/",
          sourcePrefix: ''
        },
        module: {
          preLoaders: [
            {
              test: /\.js$/, // include .js files
              exclude: /node_modules/, // exclude any and all files in the node_modules folder
              loader: "jshint-loader"
            }
          ],
          // more options in the optional jshint object
          jshint: {
              // any jshint option http://www.jshint.com/docs/options/
              // i. e.
              camelcase: true,

              // jshint errors are displayed by default as warnings
              // set emitErrors to true to display them as errors
              emitErrors: false,

              // jshint to not interrupt the compilation
              // if you want any file with jshint errors to fail
              // set failOnHint to true
              failOnHint: false,

              // custom reporter function
              reporter: function(errors) { }
          },
          loaders: [
            {
              test: /\.hgn$/,
              loader: 'mustache'
            },
            // the url-loader uses DataUrls
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: 'url-loader?limit=10000&minetype=application/font-woff&name=app/fonts/[name]-[hash].[ext]'
            },
            // the file-loader emits files
            {
              // test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              test: /\.(ttf|eot|svg)$/,
              // loader: 'file'
              loader: "file-loader?name=app/fonts/[name]-[hash].[ext]"
            },
            {
              test: /\.scss$/,
              // loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'
              loader: "style-loader!raw-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
            },
            {
              test: /\.css$/,
              // loader: 'style!css!autoprefixer?browsers=last 2 version'
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
              test: /\.jpe?g$/,
              // loader: 'file' //?name=[name].[ext]' // prevents from long term caching
              loader: "file-loader?name=assets/[name]-[hash].[ext]"
            },
            {
              test: /\.png$/,
              // loader: 'url?mimetype=image/png'
              loader: "file-loader?name=assets/[name]-[hash].[ext]"
            },
            {
              test: /\.(gif|svg)$/,
              loader: 'file-loader',
              query: { name: '[name].[hash].[ext]' }
            },
            {
              test: /favicon.ico$/,
              // loader: 'file?name=favicon.ico'
              loader: "file-loader?name=[name]-[hash].[ext]"
            },
            {
              test: /\.json$/,
              loader: "json-loader?name=[name]-[hash].[ext]"
            }
          ],
          noParse: /\.min\.js$/
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
            new CommonsChunkPlugin('vendor', 'vendor_bundle-[hash].js'),
            new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }), // [contenthash]
            new CompressionPlugin({
                asset: "{file}.gz",
                algorithm: "gzip",
                regExp: /(\.js|\.html)$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new DefinePlugin({
                __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
                __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
            }),
            new I18nPlugin(
                languages["pl"]
            ),
            new HtmlWebpackPlugin({
                  filename: 'index_pl.html',
                  template: 'app/index_pl.html',
                  meta: metaAttributes
            })
        ],
        // When watching need a > 0 watchDelay or webpack generates multiple file change notifications
        watchDelay: 1
    },
    {
        //cache: true,
        debug: true,
        entry: {
            app_en: "./app/scripts/app.js",
            vendor: [
              'jquery',
              'flight',
              'hogan.js',
              'normalize-css',
              'es6-promise',
              'fetch'//,
              //'font-awesome-webpack'
            ]
        },
        output: {
          path: path.join(__dirname, 'dist/[hash]/'),
          filename: '[name]_bundle-[chunkhash].js',
          publicPath: "/",
          sourcePrefix: ''
        },
        module: {
          preLoaders: [
            {
              test: /\.js$/, // include .js files
              exclude: /node_modules/, // exclude any and all files in the node_modules folder
              loader: "jshint-loader"
            }
          ],
          // more options in the optional jshint object
          jshint: {
              // any jshint option http://www.jshint.com/docs/options/
              // i. e.
              camelcase: true,

              // jshint errors are displayed by default as warnings
              // set emitErrors to true to display them as errors
              emitErrors: false,

              // jshint to not interrupt the compilation
              // if you want any file with jshint errors to fail
              // set failOnHint to true
              failOnHint: false,

              // custom reporter function
              reporter: function(errors) { }
          },
          loaders: [
            {
              test: /\.less$/,
              loader: "style-loader!css-loader!less-loader"
            },
            {
              test: /\.hgn$/,
              loader: 'mustache'
            },
            // the url-loader uses DataUrls
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: 'url-loader?limit=10000&minetype=application/font-woff&name=app/fonts/[name]-[hash].[ext]'
            },
            // the file-loader emits files
            {
              // test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              test: /\.(ttf|eot|svg)$/,
              // loader: 'file'
              loader: "file-loader?name=app/fonts/[name]-[hash].[ext]"
            },
            {
              test: /\.scss$/,
              // loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'
              loader: "style-loader!raw-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
            },
            {
              test: /\.css$/,
              // loader: 'style!css!autoprefixer?browsers=last 2 version'
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
              test: /\.jpe?g$/,
              // loader: 'file' //?name=[name].[ext]' // prevents from long term caching
              loader: "file-loader?name=assets/[name]-[hash].[ext]"
            },
            {
              test: /\.png$/,
              // loader: 'url?mimetype=image/png'
              loader: "file-loader?name=assets/[name]-[hash].[ext]"
            },
            {
              test: /\.(gif|svg)$/,
              loader: 'file-loader',
              query: { name: '[name].[hash].[ext]' }
            },
            {
              test: /favicon.ico$/,
              // loader: 'file?name=favicon.ico'
              loader: "file-loader?name=[name]-[hash].[ext]"
            },
            {
              test: /\.json$/,
              loader: "json-loader?name=[name]-[hash].[ext]"
            }
          ],
          noParse: /\.min\.js$/
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
            new CommonsChunkPlugin('vendor', 'vendor_bundle-[hash].js'),
            new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }), // [contenthash]
            new CompressionPlugin({
                asset: "{file}.gz",
                algorithm: "gzip",
                regExp: /(\.js|\.html)$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new DefinePlugin({
                __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
                __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
            }),
            new I18nPlugin(
                languages["en"]
            ),
            new HtmlWebpackPlugin({
                  filename: 'index_en.html',
                  template: 'app/index_en.html',
                  meta: metaAttributes
            })
        ],
        // When watching need a > 0 watchDelay or webpack generates multiple file change notifications
        watchDelay: 1
    }
];