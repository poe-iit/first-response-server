const { model } = require("mongoose")
const { nodeSchema } = require("../../models/node")

const NodeModel = model("Node", nodeSchema)

// Define a 'Node' class to encapsulate node-related operations and data
class Node {
  constructor(node, context) {
    if(!context?.isAuth) throw new Error("Error retrieving Node data. You are not authenticated.")
    this.context = context
    this.node = node
    // console.log(node)
    this.id = node.id || ""
    this.name = node.name || ""
    this.state = node.state
    this.connections = node.connections || [] // Work on converting this into an array of Node
    this.isExit = node.isExit
    this.ui = node.ui
  }
}

// Export the Node class for use in other parts of the application
module.exports = Node