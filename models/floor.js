// Destructure Schema from Mongoose to define a schema for a MongoDB collection
const { model,Schema } = require("mongoose")

// Destructure ObjectId type from Mongoose to use it as a reference type in the schema
const { ObjectId } = require("mongoose").Types

// Define a schema for a "Floor" collection
const floorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  building: {
    type: ObjectId,
    ref: "Building",
    required: true
  },
  nodes: [{
    type: ObjectId,
    ref: "Node",
  }],
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

floorSchema.post("save", (doc) => {
  const { buildingSchema } = require("../../../models/building")
  const BuildingModel = model("Building", buildingSchema )

  const buildingId = doc.building

  const building = BuildingModel.findById(buildingId)
  if(!building) throw new Error("Building not found")

  const uniqueFLoors = new Set(building.floors)
  uniqueFLoors.add(doc.id)

  building.floors = Array.from(uniqueFLoors)

  building.save()
})

// Export the floor schema as part of an object
module.exports = {
  floorSchema
}