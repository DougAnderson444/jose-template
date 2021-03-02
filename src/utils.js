import parseJwk from 'jose/jwk/parse'
import CompactSign from 'jose/jws/compact/sign'
import compactVerify from 'jose/jws/compact/verify'
import { encode, decode } from 'jose/util/base64url'

import canonicalize from 'canonicalize'
import sodium from 'sodium-universal'

// privateKey must be in KeyLike format
async function getCompactJWS (data, secretKey, alg = 'EdDSA') {
  if (!Buffer.isBuffer(secretKey)) secretKey = Buffer.from(secretKey, 'hex')

  const privateKeyJwk = privateKeyJwkFromEd25519PrivateKey(secretKey)

  const privateKeyLike = await parseJwk({ ...privateKeyJwk, alg }) // Returns: Promise<KeyLike>
  console.log()

  // Compact JWS Signature
  const encoder = new TextEncoder()

  if (data instanceof Object) data = JSON.stringify(data) // needs to be a string

  const jwsCompact = await new CompactSign(encoder.encode(data))
    .setProtectedHeader({ alg })
    .sign(privateKeyLike)
  return jwsCompact
}

// private JWK is simply the private key as d and x
const privateKeyJwkFromEd25519PrivateKey = (Ed25519privateKey) => {
  const jwk = {
    crv: 'Ed25519',
    d: encode(Ed25519privateKey.slice(0, 32)),
    x: encode(Ed25519privateKey.slice(32, 64)),
    kty: 'OKP'
  }
  const kid = getKid(jwk)
  return {
    ...jwk,
    kid
  }
}

const publicKeyJwkFromPublicKey = (Ed25519publicKey) => {
  if (!Buffer.isBuffer(Ed25519publicKey)) Ed25519publicKey = Buffer.from(Ed25519publicKey, 'hex')
  const jwk = {
    crv: 'Ed25519',
    x: encode(Ed25519publicKey),
    kty: 'OKP'
  }
  const kid = getKid(jwk)
  return {
    ...jwk,
    kid
  }
}

const getKid = (jwk) => {
  const copy = { ...jwk }
  delete copy.d
  delete copy.kid
  delete copy.alg
  const digest = Buffer.alloc(sodium.crypto_generichash_BYTES)
  const uint8array = new TextEncoder('utf-16').encode(canonicalize(copy))
  sodium.crypto_generichash(digest, uint8array) // blake2b-256
  return encode(Buffer.from(digest))
}

async function validatePayload (jwsCompact, publicKeyJwk, alg = 'EdDSA') {
  // Compact verify
  const decoder = new TextDecoder()
  try {
    const publicKeyLike = await parseJwk({ ...publicKeyJwk, alg })
    const { payload, protectedHeader } = await compactVerify(jwsCompact, publicKeyLike)

    // console.log(protectedHeader)
    // console.log(decoder.decode(payload))
    // verify success
    return JSON.parse(decoder.decode(payload))
  } catch (error) {
    // verify failed
    console.error(error)
    return false
  }
}

// module.exports
export {
  compactVerify,
  publicKeyJwkFromPublicKey,
  getCompactJWS,
  validatePayload
}
