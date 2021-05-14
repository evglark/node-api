import JsonWebToken from 'jsonwebtoken'
import { JW_TOKEN } from '../../config'

export default {
  genToken(data) {
    return JsonWebToken.sign(data, JW_TOKEN)
  },

  verify(token) {
    return JsonWebToken.verify(token, JW_TOKEN)
  },
}
