const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const TerserPlugin = require('terser-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, ''),
    filename: pkg.browser,
    library: 'joseutils',
    libraryTarget: 'umd'
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    alias: {
      process: 'process/browser'
    },
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      // webpack 5 stuff
      buffer: require.resolve('buffer/'), // npm install buffer --save
      crypto: require.resolve('crypto-browserify')
      // process: require.resolve('process/browser'),
      // stream: require.resolve('stream-browserify'),
      // assert: require.resolve('assert/'),
      // url: require.resolve('url/'),
      // events: require.resolve('events/')
    }
  },
  mode,
  optimization: {
    usedExports: true // tree-shaking
    // minimize: true,
    // minimizer: [new TerserPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // pending https://github.com/sveltejs/svelte/issues/2377
    // dev && new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/wordlists\/(?!english)/,
      contextRegExp: /bip39/
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  ]
}
