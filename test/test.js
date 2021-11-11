/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require("chai")
const { parseKey, generateKeyPair, convertToJwk, sign, verify } = require("../")

const isNode = typeof window === "undefined"

const jwt = {
    alg: "ES256",
    crv: "P-256",
    kty: "EC",
    d: "VhsfgSRKcvHCGpLyygMbO_YpXc7bVKwi12KQTE4yOR4",
    x: "ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw",
    y: "_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo",
}

const mockSeedHex =
    "1234567890123456789012345678901234567890123456789012345678901234"
const mockPublicKeyHex =
    "c9df7bcba2238bedcc681e8b17bb21c1625d21d285b70c20cf53fdd473db9dfb"
const mockSecretKeyKeyHex =
    "1234567890123456789012345678901234567890123456789012345678901234c9df7bcba2238bedcc681e8b17bb21c1625d21d285b70c20cf53fdd473db9dfb"

const mockPublicKeyJwk = {
    crv: "Ed25519",
    x: "yd97y6Iji-3MaB6LF7shwWJdIdKFtwwgz1P91HPbnfs",
    kty: "OKP",
    kid: "HJUHVNZ1A5JJM4TL__UhjfVkLFeI7kH_67jdtM2f3Xo",
}

const mockSecretKeyJwk = {
    crv: "Ed25519",
    d: "EjRWeJASNFZ4kBI0VniQEjRWeJASNFZ4kBI0VniQEjQ",
    x: "yd97y6Iji-3MaB6LF7shwWJdIdKFtwwgz1P91HPbnfs",
    kty: "OKP",
    kid: "HJUHVNZ1A5JJM4TL__UhjfVkLFeI7kH_67jdtM2f3Xo",
}

describe("Array", () => {
    describe("Tests", () => {
        it("should parse", async () => {
            const parsed = await parseKey(jwt)
            if (isNode) {
                expect(parsed).to.be.a("object") // Node KeyObject
            } else {
                // Browser
                expect(parsed).to.be.a("CryptoKey")
                // expect(await parseKey()).to.be.a('Object') // doesnt work in browser?
                // expect(parsed).to.have.property('algorithm') // Browser
            }
        })
        it("should generateKeyPair", () => {
            const seed = Buffer.from(mockSeedHex, "hex")
            expect(seed.length).to.equal(32)
            const kp = generateKeyPair(seed)
            expect(kp.publicKey.toString("hex")).to.equal(mockPublicKeyHex)
            expect(kp.secretKey.toString("hex")).to.equal(mockSecretKeyKeyHex)
        })
        it("should convert a KeyPair", async () => {
            const keyPairJwk = await convertToJwk(
                mockPublicKeyHex,
                mockSecretKeyKeyHex
            )

            expect(keyPairJwk).to.have.property("publicKeyJwk")
            expect(keyPairJwk).to.have.property("secretKeyJwk")
            // public properties
            expect(keyPairJwk.publicKeyJwk).to.have.property("crv")
            expect(keyPairJwk.publicKeyJwk).to.have.property("x")
            expect(keyPairJwk.publicKeyJwk).to.have.property("kty")
            expect(keyPairJwk.publicKeyJwk).to.have.property("kid")
            // secret properties
            expect(keyPairJwk.secretKeyJwk).to.have.property("crv")
            expect(keyPairJwk.secretKeyJwk).to.have.property("d")
            expect(keyPairJwk.secretKeyJwk).to.have.property("x")
            expect(keyPairJwk.secretKeyJwk).to.have.property("kty")
            expect(keyPairJwk.secretKeyJwk).to.have.property("kid")
        })
        it("should sign and verify a payload", async () => {
            const mockPayload = { are: "you mocking me?" }

            const jws = await sign(mockPayload, mockSecretKeyJwk)
            const payload = await verify(jws, mockPublicKeyJwk)

            expect(payload).to.deep.equal(mockPayload)

            // Same test, derived from seed and converted to JWK
            const seed = Buffer.from(mockSeedHex, "hex")
            const kp = generateKeyPair(seed)
            expect(kp.publicKey.toString("hex")).to.equal(mockPublicKeyHex)
            expect(kp.secretKey.toString("hex")).to.equal(mockSecretKeyKeyHex)

            const keyPairJwk = await convertToJwk(
                kp.publicKey.toString("hex"),
                kp.secretKey.toString("hex")
            )
            expect(keyPairJwk).to.have.property("publicKeyJwk")
            expect(keyPairJwk).to.have.property("secretKeyJwk")

            const jws2 = await sign(mockPayload, keyPairJwk.secretKeyJwk)
            const payload2 = await verify(jws, keyPairJwk.publicKeyJwk)
            expect(payload2).to.deep.equal(mockPayload)
        })
    })
})
