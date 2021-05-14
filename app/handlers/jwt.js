import Services from '../services'
import User from '../modules/user/models'

export default () => async (ctx, next) => {
  const { authorization } = ctx.headers
  if (authorization) {
    try {
      const { email } = await Services.JWT.verify(authorization)
      ctx.user = await User.findOne({ email })
    } catch (e) {
      ctx.throw(401, { message: 'Unauthorized. Invalid token' })
    }
  }

  await next()
}
