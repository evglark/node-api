import error from './error'
import jwt from './jwt'

export default (app) => {
  app.use(error())
  app.use(jwt())
}
