import Router from 'koa-router'
import PostController from '../post/controllers'
import UserController from './controllers'
import checkUser from './helpers/checkUser'

const router = new Router({ prefix: '/user' })
    .get('/current', checkUser(), UserController.getCurrentUser)
    .get('/:id/posts', checkUser(), PostController.getUserPosts)

export default router.routes()
