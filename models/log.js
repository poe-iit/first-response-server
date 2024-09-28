// Destructure Schema from Mongoose to define a schema for a MongoDB collection
const { Schema } = require("mongoose")

// Define a schema for a "Log" collection
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
  // Add createdAt and updatedAt timestamps to the schema automatically
  timestamps: true
})

// Export the log schema as part of an object
module.exports = {
  logSchema
}