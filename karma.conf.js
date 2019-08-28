// Karma configuration
// Generated on Wed Aug 14 2019 00:11:03 GMT+0900 (Japan Standard Time)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'test/**/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*.js': ['webpack'],
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    webpack: {
      mode: 'development',
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
    },
    browsers: [ process.env.APPVEYOR ? 'IE' : 'ChromeHeadless' ],
    singleRun: true,
    concurrency: 1,
  })
}
