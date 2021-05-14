import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

import userSchema from './schema'
import userStatics from './statics'
import userMethods from './methods'

mongoose.plugin(uniqueValidator)

const UserSchema = userSchema
UserSchema.statics = userStatics
UserSchema.methods = userMethods

// Middleware
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
  }

  next()
})

export default mongoose.model('user', UserSchema)
