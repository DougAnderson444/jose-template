const pkg = require('./package.json') // cannot import .json in mjs
const path = require('path')

const mode = 'development' // 'production' // 'development' //
const entry = './src/main.mjs'

module.exports = [
  {
    entry,
    experiments: {
      outputModule: true
    },
    output: {
      filename: pkg.browser,
      path: path.resolve(__dirname, ''),
      module: true,
      libraryTarget: 'module'
    },
    mode,
    resolve: {
      mainFields: ['browser']
    }
  },
  {
    entry,
    mode,
    output: {
      filename: pkg.main,
      path: path.resolve(__dirname, '')
    },
    resolve: {
      mainFields: ['main']
    }
  }
]
