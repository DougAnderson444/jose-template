# Testing Framework for both the Browser and Nodejs

I was building a library for both Nodejs and the Browser and needed a setup that ensures the same code and the same tests work in both.

## Use it

Clone this repo 

`npm install`

`npm run test`

Also, you can open un `index.html` and check the console to see the UMD output of the same thing.

## Curves

Note panva/jose only supports WebCrypto API registered curves, so P-256. Octet Key Pair (OKP) are not supported, thus no Ed25519 curve.

## Testing Setup

Install:
- [Mocha](https://mochajs.org/) Test Framework
- [Chai](https://www.npmjs.com/package/chai) Assertion Library (Expect)
- [Karma](https://karma-runner.github.io/latest/index.html) To run the tests in the browser 

## Test Config

Put all the common tests in `test.js`. Karma will bundle it using webpack and `karma-webpack`.

```js
const { expect } = require('chai')
const { sum, parseKey } = require('../')

const isNode = (typeof window === 'undefined')

describe('Array', () => {
  describe('Tests', () => {
    it('should sum', () => {
      expect(sum(1, 1)).to.equal(2)
    })
    it('should add', () => {
      expect(4).to.equal(4)
    })
    it('should parse', async () => {
      const parsed = await parseKey()
      console.log(parsed)
       if (isNode) {
        expect(parsed).to.be.a('object') // Node KeyObject
      } else {
        // Browser
        expect(parsed).to.be.a('CryptoKey')
      }
    })
    it('should fail', () => {
      expect(3).to.equal(4)
    })
  })
})
```

## Run Tests

Karma will build everything with webpack then run the tests.

```
npm run test
```

## Travis CI

Should run in Continuous Integration as the web-runner is headless browser.

`.travis.yml`

## Building for Production

Need to bundle for the browser for production!

All the choices: Browserify, webpack, rollup, or esbuild?

Rollup: Doesnt resolve "browser" field in panva/jose subpaths, so I went with Webpack.
