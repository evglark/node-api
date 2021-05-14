import Post from '../models'

export default () => async (id, ctx, next) => {
  const post = await Post.findOne({ id })
  if (!post) ctx.throw(404, `Post with id "${id}" not found`)

  await next()
}
