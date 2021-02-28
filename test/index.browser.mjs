// tests the js in a browser env
// important to make sure the shims, polyfills, crypto, etc work well

import tests from './basic.spec.mjs'
import { expect } from '@esm-bundle/chai'
import { parseJWT } from '..'

tests(expect, { parseJWT })
