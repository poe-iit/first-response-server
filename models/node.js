// Destructure Schema from Mongoose to define a schema for a MongoDB collection
const { model, Schema } = require("mongoose")
const { ObjectId } = require("mongoose").Types

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
}, {
  // Add createdAt and updatedAt timestamps to the schema automatically
  timestamps: true
})

// Add a post-save hook to the schema
// For sanity, I'm doing this so i don't have to worry about it anywhere else
nodeSchema.post("save", async (doc) => {
  const { floorSchema } = require("./floor")
  const FloorModel = model("Floor", floorSchema )

  const floorId = doc.floor

  const floor = FloorModel.findById(floorId)

  if(!floor) throw new Error("Floor not found")
  
  const uniqueNodes = new Set(floor.nodes)
  uniqueNodes.add(doc._id)

  floor.nodes = Array.from(uniqueNodes)
  await floor.save()

})

// Export the node schema as part of an object
module.exports = {
  nodeSchema
}