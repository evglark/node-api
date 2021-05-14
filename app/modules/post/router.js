import Router from 'koa-router'
import postController from './controllers'
import checkUser from '../user/helpers/checkUser'
import checkPost from './helpers/checkPost'

const router = new Router({ prefix: '/post' })
    .post('/', checkUser(), postController.create)
    .get('/', postController.searchPosts)

    .param('id', checkPost())
    .put('/:id', checkUser(), postController.update)
    .delete('/:id', checkUser(), postController.delete)
    .get('/:id', postController.getPost)


export default router.routes()
