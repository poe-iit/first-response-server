// Destructure Schema from Mongoose to define a schema for a MongoDB collection
const { model, Schema } = require("mongoose")
const { ObjectId } = require("mongoose").Types

// Define a schema for a "Node" collection
const invisibleNodeSchema = new Schema({
  connectedNodes: [
    {
      type: ObjectId,
      ref: "Node"
    }
  ],
  floor: {
    type: ObjectId,
    ref: "Floor",
    required: true
  },
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

// Add a post-save hook to the schema
// This is to toss out worrying about updating the nodes in the actual resolver code
invisibleNodeSchema.post("save", async (doc) => {
  const { nodeSchema } = require("./node")
  const NodeModel = model("Node", nodeSchema )

  const connectedNodes = doc.connectedNodes
  for(const connectedNodeId of connectedNodes) {
    const node = await NodeModel.findById(connectedNodeId)
    if(!node) continue

    const uniqueConntections = new Set(node.connections)
    uniqueConntections.add(doc._id)

    node.connections = Array.from(uniqueConntections)
    await node.save()
  }
})

// Export the node schema as part of an object
module.exports = {
  invisibleNodeSchema
}