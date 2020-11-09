import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  structure: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  toJSON: {
    transform (doc, ret) {
      delete ret._id
    }
  }
})

export const Schema = mongoose.model('Schema', schema)
