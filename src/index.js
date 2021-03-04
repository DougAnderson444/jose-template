const { default: parseJwk } = require('jose/jwk/parse')
const sodium = require('sodium-universal')
const utils = require('./utils.js')

module.exports.generateKeyPair = (seed) => {
  const keyPair = {
    publicKey: Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES),
    secretKey: Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES)
  }
  sodium.crypto_sign_seed_keypair(keyPair.publicKey, keyPair.secretKey, seed)
  return keyPair
}

module.exports.parseKey = async (jwt) => {
  const ecPrivateKey = await parseJwk(jwt)
  return ecPrivateKey
}

module.exports.convertToJwk = async (publicKey, secretKey = {}) => {
  const publicKeyJwk = utils.publicKeyJwkFromPublicKey(publicKey)
  let secretKeyJwk
  if (secretKey) secretKeyJwk = utils.privateKeyJwkFromEd25519PrivateKey(secretKey)

  return { publicKeyJwk, secretKeyJwk }
}

module.exports.sign = async (data, secretKeyJwk, alg) => {
  const signature = await utils.getCompactJWS(data, secretKeyJwk, alg)
  return signature
}

module.exports.verify = async (jwsCompact, publicKeyJwk) => {
  const payload = await utils.validatePayload(jwsCompact, publicKeyJwk)
  return payload
}
