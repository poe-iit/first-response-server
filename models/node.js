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
nodeSchema.post("findOneAndDelete", async (doc) => {
  const { floorSchema } = require("./floor")
  const { invisibleNodeSchema } = require("./invisibleNode")
  const FloorModel = model("Floor", floorSchema )
  const InvisibleNodeModel = model("InvisibleNode", invisibleNodeSchema )

  const floorId = doc.floor.toString()
  const floor = await FloorModel.findById(floorId)

  if(!floor) throw new Error("Floor not found")

  floor.nodes = floor.nodes.filter(node => node._id.toString() !== doc._id.toString())
  await floor.save()

  const invisibleNodes = await InvisibleNodeModel.find({ connectedNodes: { $in: doc._id } })
  for(const invisibleNode of invisibleNodes) {
    await InvisibleNodeModel.findOneAndDelete({
      _id: new ObjectId(invisibleNode._id)
    })
  }
})



// For sanity, I'm doing this so i don't have to worry about it anywhere else
nodeSchema.post("save", async (doc) => {
  const { floorSchema } = require("./floor")
  const FloorModel = model("Floor", floorSchema )

  const floorId = doc.floor

  const floor = await FloorModel.findById(floorId)

  if(!floor) throw new Error("Floor not found")
  
  floor.nodes = floor.nodes.filter(node => node._id.toString() !== doc._id.toString())
  floor.nodes.push(doc._id)
  await floor.save()

})

// Export the node schema as part of an object
module.exports = {
  nodeSchema
}