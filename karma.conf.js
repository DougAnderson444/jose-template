const webpack = require('webpack')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'webpack'],
    files: [
      // all files ending in ".test.js"
      // !!! use watched: false as we use webpacks watch
      { pattern: 'test/**/*test.js', watched: false }
    ],
    reporters: ['progress'],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher'
    ],
    preprocessors: {
      // add webpack as preprocessor
      'test/**/*test.js': ['webpack']
    },
    webpack: {
      // karma watches the test entry points
      // Do NOT specify the entry option
      // webpack watches dependencies

      // any additional webpack configuration
      // default is https://github.com/ryanclark/karma-webpack#default-webpack-configuration
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser'
        })
      ]
    }
  })
}
