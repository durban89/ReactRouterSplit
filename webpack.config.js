/**
 * Created by durban126 on 16/1/26.
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: __dirname + '/app.js',
  },
  output: {
    path: __dirname + '/.public/js',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/.public/js/',
  },
  module: {
    loaders: [{
      test: /\.js?$|\.jsx?$/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-async-to-generator', 'transform-strict-mode', 'transform-object-assign', 'transform-decorators-legacy'],
        presets: ['es2015', 'react'],
      },
      exclude: /(node_modules)/,
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      exclude: /(node_modules)/,
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff',
      exclude: /(node_modules)/,
    }, {
      test: /\.(ttf|eot|svg|TTF)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
      exclude: /(node_modules)/,
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=10240',//小于10k的自动处理为base64图片
      exclude: /(node_modules)/,
    }, {
      test: /\.(gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],
      exclude: /(node_modules)/,
    }, ],
  },
  plugins: process.env.NODE_ENV == 'production' ? [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({ 
      'global.GENTLY': false,
      'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
  ] : [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'global.GENTLY': false,
      __DEV__: true,
    }),
  ],
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
    // 'react-router': 'ReactRouter',
    // 'react-redux': 'ReactRedux'
  },
  resolve: {
    root: __dirname + '/js/',
    extensions: ['', '.js', '.jsx'],
    alias: {

    },
  },
  node: {
    __dirname: true,
  },
  watch: process.env.NODE_ENV == 'production' ? false : true,
};
