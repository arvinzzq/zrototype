const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './docs/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../docs/dist'),
    publicPath: 'docs/dist/',
    filename: '[name].js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './docs/',
    compress: false,
    progress: true,
    port: 2345,
    open: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: false,
      version: false,
      warnings: true,
      colors: true
    }
  }
};