// Destructure Schema from Mongoose to define a schema for a MongoDB collection
const { Schema } = require("mongoose")

// Destructure ObjectId type from Mongoose to use it as a reference type in the schema
const { ObjectId } = require("mongoose").Types

// Define a schema for a "Building" collection
const buildingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  floors: [{
    type: ObjectId,
    ref: "Floor",
  }]
}, {
  // Add createdAt and updatedAt timestamps to the schema automatically
  timestamps: true
})

// Export the building schema as part of an object
module.exports = {
  buildingSchema
}