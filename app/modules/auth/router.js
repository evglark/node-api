import Router from 'koa-router'

import authController from './controllers'

const router = new Router({ prefix: '/auth' })
    .post('/sign-up', authController.signUp)
    .post('/sign-in', authController.signIn)
    .get('/private', authController.getByToken)


export default router.routes()
