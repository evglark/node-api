import Router from 'koa-router'
import auth from '../modules/auth/router'
import post from '../modules/post/router'
import user from '../modules/user/router'

const router = new Router({ prefix: '/api' })

router.use(auth)
router.use(post)
router.use(user)

export default router.routes()
