const { model } = require("mongoose")
const { nodeSchema } = require("../../../models/node")
const NodeModel = model("Node", nodeSchema )

const Node = require("../node")

// Work on adding the invisibleNodes logic to the node update
const updateNode = async ({
  updateNodeInput: { id, name, state, isExit, ui, isDeleted }
}, context) => {
  if(!context?.isAuth) throw new Error("Error updating Node. You are not authenticated.")

  if(isDeleted){
    await NodeModel.findOneAndDelete({
      _id: new ObjectId(`${nodeInput.id}`)
    })
    return null
  }
  const node = await NodeModel.findById(id)

  if(!node){
    throw new Error("Node not found")
  }

  node.name = name
  node.state = state
  node.isExit = isExit
  node.ui = ui

  await node.save()
  
  return new Node(node, context)
}

module.exports = {
  updateNode
}