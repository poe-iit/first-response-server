const { Schema, model } = require("mongoose")
const { ObjectId } = require("mongoose").Types

const buildingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  floors: [{
    id: {
      type: ObjectId,
      ref: "Floor"
    },
    name: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
})

module.exports = {
  building: () => model("Building", buildingSchema),
  buildingSchema
}