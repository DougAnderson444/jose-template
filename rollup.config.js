import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

export default [
  // build using browser field
  {
    input: 'src/main.js',
    output: {
      file: pkg.browser,
      format: 'es'
    },
    plugins: [
      nodeResolve({
        browser: true // resolves the module field not the browser field?!
      }),
      /**
      // in jose/package.json
      "exports": {
        "./jwk/parse": {
          "browser": "./dist/browser/jwk/parse.js",
          "import": "./dist/node/esm/jwk/parse.js",
          "require": "./dist/node/cjs/jwk/parse.js"
       */
      commonjs()
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/main.js',
    external: ['jose/jwk/parse'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
]
