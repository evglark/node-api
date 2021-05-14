import mongoose from 'mongoose'
import server from '../server'

mongoose.Promise = Promise

export default (mongoURL) => {
  if (!mongoURL) throw Error('Mongo url is undefined')

  return mongoose
      .connect(mongoURL, { useCreateIndex: true, useNewUrlParser: true })
      .then((mongodb) => {
        console.log(`Mongo connected to ${mongodb.connections[0].host}`)
        return mongodb
      })
      .catch(async (err) => {
        await console.log(err)
        server.close()
      })
}
