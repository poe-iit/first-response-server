const { Schema, model } = require("mongoose")

const logSchema = new Schema({
  building: {
    type: String,
    required: true
  },
  floor: {
    type: String,
    required: true
  },
  node: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})