/**
You can't require an ES module!
If this library is written in es, it cannot be required by a commonjs script
 */

const parseJWT = require('..')
const tests = require('./basic.spec.mjs')
const { expect } = require('chai')

tests(expect, { parseJWT })
