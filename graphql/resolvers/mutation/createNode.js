const { model } = require("mongoose")

const { nodeSchema } = require("../../../models/node")
const NodeModel = model("Node", nodeSchema )

const { invisibleNodeSchema } = require("../../../models/invisibleNode")
const InvisibleNodeModel = model("InvisibleNode", invisibleNodeSchema )

const Node = require("../node")

const createNode = async ({
  createNodeInput,
  invisibleNodeInputs
}, context) => {
  if(!context?.isAuth) throw new Error("Error creating Node. You are not authenticated.")

  let node
  if(createNodeInput){
    const { name, state, isExit, ui, floorId } = createNodeInput
    node = await NodeModel.findOne({ name })
    if(node) throw new Error("Node already exists")
    node = new NodeModel({ name, state, isExit, ui, floor: floorId })

    await node.save()
  }

  for(const invisibleNodeInput of invisibleNodeInputs) {
    const invisibleNode = new InvisibleNodeModel({
      floor: invisibleNodeInput.floorId,
      ui: invisibleNodeInput.ui
    })
    
    const connections = invisibleNodeInput.connections

    if(connections?.length !== 2){
      throw new Error("Expected two Nodes in connections array")
    }

    // Not good
    // Add ivisibleNode id to the other node too(not just the first one)
    if(connections[0].name){
      if(!node)throw new Error("No new node was created. Please use node id instead of name")
      connections[0] = {id: node.id}
    }else if(connections[1].name){
      if(!node)throw new Error("No new node was created. Please use node id instead of name")
      connections[1] = {id: node.id}
    }

    if(!connections[0]?.id){
      throw new Error("Invisible Node expects an id of connected Node.")
    }
    connections[0] = connections[0].id

    if(!connections[1]?.id){
      throw new Error("Invisible Node expects an id of connected Node.")
    }
    connections[1] = connections[1].id

    
    invisibleNode.connectedNodes = connections
    await invisibleNode.save()

  }

  await node.save()

  if(!node)return null
  return new Node(node, context)
}

module.exports = {
  createNode
}