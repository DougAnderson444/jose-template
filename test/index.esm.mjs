// tests the js in a browser env
// important to make sure the shims, polyfills, crypto, etc work well

import tests from './basic.spec.mjs'
import { expect } from 'chai'
import { parseJWT } from '../src/main.mjs' // node doesn't accept directory imports, must be a named file with extention

tests(expect, { parseJWT })
