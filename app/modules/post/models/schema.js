import { Schema } from 'mongoose'

export default new Schema({
  userId: {
    type: String,
    equired: 'User ID is required'
  },
  title: {
    type: String,
    required: 'Title is required',
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})
