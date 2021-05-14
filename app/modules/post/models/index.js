import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import postSchema from './schema'
import postStatics from './statics'

mongoose.plugin(uniqueValidator)

const PostSchema = postSchema

PostSchema.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
})

PostSchema.statics = postStatics

export default mongoose.model('post', PostSchema)
