/* global describe, it */
/* eslint no-undef: "error" */

/**
 * All tests that apply to both node and browser go here
 */

const jwk = {
  alg: 'ES256',
  crv: 'P-256',
  kty: 'EC',
  d: 'VhsfgSRKcvHCGpLyygMbO_YpXc7bVKwi12KQTE4yOR4',
  x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
  y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo'
}

export default (expect, functions) => {
  // functions test
  const { parseJWT } = functions

  describe('JWK', function () {
    it('parses a jwk', async () => {
      const parsed = await parseJWT(jwk)
      expect(parsed).to.have.property('type', 'private')
      // expect(parsed).to.have.deep.property('algorithm', { name: 'ECDSA', namedCurve: 'P-256' })
      // expect(parsed).to.have.deep.property('usages', ['sign'])
    })
  })
}
