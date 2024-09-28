// Destructure Schema from Mongoose to define a schema for a MongoDB collection
const { Schema } = require("mongoose")

// Destructure ObjectId type from Mongoose to use it as a reference type in the schema
const { ObjectId } = require("mongoose").Types

// Import nodeSchema to use it as a reference type in the schema
const { nodeSchema } = require("./node")

// Define a schema for a "Floor" collection
const floorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  building: {
    type: ObjectId,
    ref: "Building"
  },
  nodes: {
    type: Map,
    of: nodeSchema
  },
  paths: {
    type: Map,
    of: Schema.Types.Mixed
  },
  image: {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
    position: [Number],
    scale:{
      type: Number,
      default: 1,
    }
  }
}, {
  // Add createdAt and updatedAt timestamps to the schema automatically
  timestamps: true
})

// Export the floor schema as part of an object
module.exports = {
  floorSchema
}