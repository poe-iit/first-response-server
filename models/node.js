// Destructure Schema from Mongoose to define a schema for a MongoDB collection
const { Schema } = require("mongoose")

// Define a schema for a "Node" collection
const nodeSchema = new Schema({
  name: String,
  state: {
    type: String,
    required: true
  },
  isExit: {
    type: Boolean,
    required: true
  },
  floor: {
    type: ObjectId,
    ref: "Floor",
    required: true
  },
  connections: [{
    type: ObjectId,
    ref: "InvisibleNode"
  }], // Array of connections
  ui: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  }
})

// Export the node schema as part of an object
module.exports = {
  nodeSchema
}