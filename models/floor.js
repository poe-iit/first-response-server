const { Schema, model } = require("mongoose")
const { ObjectId } = require("mongoose").Types

const floorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  building: {
    type: ObjectId,
    ref: "Building"
  },
  nodes: [{
    id: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    isExit: {
      type: Boolean,
      required: true
    },
    connections: [String], // Array of connections
    ui: {
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      }
    },
    name: String
  }]
}, {
  timestamps: true
})