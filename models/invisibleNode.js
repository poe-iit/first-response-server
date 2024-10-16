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
  ]
}, {
  // Add createdAt and updatedAt timestamps to the schema automatically
  timestamps: true
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

    node.connections = node.connections || []
    node.connections = node.connections.filter((invisibleNodeId) => invisibleNodeId._id.toString() !== doc._id.toString())
    node.connections.push(doc._id)

    await node.save()
  }
})

// Export the node schema as part of an object
module.exports = {
  invisibleNodeSchema
}