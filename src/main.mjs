import parseJwk from 'jose/jwk/parse'

export const parseJWT = async (jwk) => {
  return await parseJwk(jwk)
}
