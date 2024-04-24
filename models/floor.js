const { Schema, model } = require("mongoose")
const { ObjectId } = require("mongoose").Types

const nodeSchema = new Schema({
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
  }
})

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
  timestamps: true
})

module.exports = {
  floor: () =>  model("Floor", floorSchema),
  floorSchema
}