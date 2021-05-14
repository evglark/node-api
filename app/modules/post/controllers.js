import _ from 'lodash'
import Post from './models'

export default {
  async create(ctx) {
    const data = {
      ..._.pick(ctx.request.body, Post.createFields),
      userId: ctx.user._id
    }

    // Posts limited
    // const { userId } = data;
    // const postCountByUserId = await Post.count({ userId });
    // if (postCountByUserId === 3) throw Error('The user cannot create more 3 Summary');

    const { _id } = await Post.create(data)
    const post = await Post.find({ _id })

    ctx.body = { data: post }
  },

  async update(ctx) {
    const {
      params: { id: _id },
      request: { body },
      user: { _id: userId },
    } = ctx

    const post = await Post.findOne({ _id }).select({ __v: 0 })

    if (post.userId !== userId.toHexString()) ctx.throw(403, `Forbidden. Post with id "${_id}" dont belong to user with id ${userId}`)
    post.set(_.pick(body, Post.createFields))
    const updatedPost = await post.save()

    ctx.body = { data: updatedPost }
  },

  async delete(ctx) {
    const {
      params: { id: _id },
      user: { _id: userId },
    } = ctx

    const post = await Post.findOne({ _id }).select({ __v: 0 })

    if (post.userId !== userId.toHexString()) ctx.throw(403, `Forbidden. Post with id "${_id}" dont belong to user with id ${userId}`)
    await post.remove()

    ctx.body = { data: { id: _id} }
  },

  async getPost(ctx) {
    const {
      params: { id: _id }
    } = ctx

    const post = await Post.findOne({ _id }).select({ __v: 0 })

    ctx.body = { data: post }
  },

  async getUserPosts(ctx) {
    const { user: { _id: userId } } = ctx
    const posts = await Post.find({ userId }).select({ __v: 0 })

    ctx.body = { data: posts }
  },

  async searchPosts(ctx) {
    const MAX_SIZE = 20
    const PAGE = 1
    const queryParams = _.pick(ctx.request.query, ['title', 'content', 'size', 'page'])
    const filter = {
      title: queryParams.title || '',
      content: queryParams.content || '',
      size: parseInt(queryParams.size),
      page: parseInt(queryParams.page)
    }

    if (!filter.size || filter.size > MAX_SIZE) filter.size = MAX_SIZE
    if (!filter.page) filter.page = PAGE

    const query = {}
    if (filter.title) query.title = { $regex: filter.title }
    if (filter.content) query.content = { $in: filter.content }

    const count = await Post.count(query).sort({ updatedAt: '-1' })
    const pages = Math.ceil(count / filter.size)

    const post = await Post.find(query).select({ __v: 0 })
        .sort({ updatedAt: '-1' }).populate('user', { password: 0, __v: 0 })
        .limit(filter.size).skip((filter.pages - 1) * filter.size)

    ctx.body = { data: post, filter, count, pages }
  }
}
