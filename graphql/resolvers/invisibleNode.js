const { model } = require("mongoose")
const { invisibleNodeSchema } = require("../../models/invisibleNode")

const InvisibleNodeModel = model("InvisibleNode", invisibleNodeSchema)

// Define a 'Floor' class to encapsulate floor-related operations and data
class InvisibleNode {
  static async build(invisibleNodeId, context) {
    if(!context?.isAuth) throw new Error("Error retrieving data. You are not authenticated.")
    const invisibleNode = await InvisibleNodeModel.findById(invisibleNodeId)

    if (!invisibleNode) {
      throw new Error(`InvisibleNode ${invisibleNodeId} not found`)
    }
    return new InvisibleNode(invisibleNode, context)
  }

  constructor(invisibleNode, context) {
    if(!context?.isAuth) throw new Error("Error retrieving Floor data. You are not authenticated.")
    this.context = context
    this.invisibleNode = invisibleNode

    this.id = invisibleNode.id
    // this.floor = invisibleNode.floor // Remove this in the future



    this.createdAt = invisibleNode.createdAt
    this.updatedAt = invisibleNode.updatedAt
  }
  async connectedNodes() {
    const Node = require("./node")
    const connections = []
    connections.push(await Node.build(this.invisibleNode.connectedNodes[0], this.context))
    connections.push(await Node.build(this.invisibleNode.connectedNodes[1], this.context))

    return connections
  }
}

module.exports = InvisibleNode