const { Schema, model } = require("mongoose")
const { ObjectId } = require("mongoose").Types

const buildingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  floors: [{
    type: ObjectId,
    ref: "Floor"
  }]
}, {
  timestamps: true
})