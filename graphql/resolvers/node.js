const { model } = require("mongoose")
const { nodeSchema } = require("../../models/node")

const NodeModel = model("Node", nodeSchema)

// Define a 'Node' class to encapsulate node-related operations and data
class Node {

  static async build(nodeId, context) {
    if(!context?.isAuth) throw new Error("Error retrieving Node data. You are not authenticated.")

    const node = await NodeModel.findById(nodeId)
    if (!node) {
      throw new Error(`Node ${nodeId} not found`)
    }

    return new Node(node, context)
  }

  constructor(node, context) {
    if(!context?.isAuth) throw new Error("Error retrieving Node data. You are not authenticated.")
    this.context = context
    this.node = node
    // console.log(node)
    this.id = node.id || ""
    this.name = node.name || ""
    this.state = node.state
    this.isExit = node.isExit
    this.ui = node.ui
  }

  async connections() {
    const connections = []
    const InvisibleNode = require("./invisibleNode")

    const invisibleNodes = this.node.connections
    for(const invisibleNodeId of invisibleNodes) {
      const invisibleNode = await InvisibleNode.build(invisibleNodeId, this.context)

      const connectedNodes = await invisibleNode.connectedNodes()
      if(connectedNodes[0].id === this.id) {
        connections.push(connectedNodes[1])
      }else {
        connections.push(connectedNodes[0])
      }
    }

    return connections
  }
}

// Export the Node class for use in other parts of the application
module.exports = Node