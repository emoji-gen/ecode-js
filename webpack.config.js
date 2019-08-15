'use strict'

const { join } = require('path')

module.exports = {
  mode: 'production',

  // Entry and Context
  //~~~~~~~~~~~~~~~~~~~~
  context: __dirname,
  entry: './index.js',

  // Output
  //~~~~~~~~~
  output: {
    filename: 'ecode.min.js',
    path: join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },

  // Node
  //~~~~~~~~
  node: {
    Buffer: false,
  },
}
