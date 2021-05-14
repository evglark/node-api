import _ from 'lodash'
import User from '../user/models'
import Services from '../../services'

export default {
  async signUp(ctx) {
    const { _id } = await User.create(_.pick(ctx.request.body, User.createFields))
    const user = await User.findOne({ _id }).select({ __v: 0 })

    ctx.status = 201
    ctx.body = { data: user }
  },

  async signIn(ctx) {
    const { email, password } = ctx.request.body
    if (!email || !password) ctx.throw(400, { message: 'Invalid data' })

    const user = await User.findOne({ email })
    if (!user) ctx.throw(400, { message: 'User not found' })
    if (!user.comparePasswords(password)) ctx.throw(400, { message: 'Invalid password' })

    const dataUser = await await User.findOne({ email }).select({ password: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    const dataToken = await Services.JWT.genToken({ email })

    ctx.body = { data: { token: dataToken, user: dataUser } }
  },

  async getByToken(ctx) {
    if (!ctx.user) ctx.throw(403, { message: 'Forbidden' })
    ctx.body = ctx.user
  }
}
