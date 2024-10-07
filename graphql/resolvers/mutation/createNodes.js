// Logic for connections and stuffs like that
const { model } = require("mongoose")
const { nodeSchema } = require("../../../models/node")
const NodeModel = model("Node", nodeSchema )

const { invisibleNodeSchema } = require("../../../models/invisibleNode")
const InvisibleNodeModel = model("InvisibleNode", invisibleNodeSchema )

// Keep checks in place to prevent duplicate invisible nodes from being created

// Commenting for sanity
// TODO: Use chatgpt later


// This is for the graphql resolver
const Node = require("../node")


// Main function... it downhill from here
const createNodes = async ({
  createNodeInputs, // Check the schema to know what you're dealing with
  invisibleNodeInputs
}, context) => {
  // Auth check. Create a function wrapper sometime in the future for this
  if(!context?.isAuth) throw new Error("Error creating Node. You are not authenticated.")

  // Array of Node resolvers to be returned
  const nodes = []
  // Mapping name of new nodes to the newly created nodes
  const nameMap = new Map()

  // This guy creates the new nodes and adds them to the nodes array
  for(const nodeInput of createNodeInputs) {
    let node = await NodeModel.findOne({ name: nodeInput.name })

    if(node) throw new Error("Node already exists")
    
    const args = {name: nodeInput.name, floor: nodeInput.floorId, connections: []}

    if(nodeInput.state) args.state = nodeInput.state
    if(nodeInput.isExit) args.isExit = nodeInput.isExit
    if(nodeInput.ui) args.ui = nodeInput.ui

    node = new NodeModel(args)

    await node.save()
  
    nameMap.set(node.name, node)
    nodes.push(node)
  }

  // For each invisible node
  // You create the invisible node
  // Replace the connections with the actual id of the connected node
  // Update the nodes to reflect that they are connected to the invisible node
  // Also figure out a way to make sure connections has only two nodes, using an array is lazy and sloppy
  for(const invisibleNodeInput of invisibleNodeInputs) {
    const invisibleNode = new InvisibleNodeModel({
      floor: invisibleNodeInput.floorId,
      ui: invisibleNodeInput.ui
    })
    
    const connections = invisibleNodeInput.connections

    if(connections?.length !== 2){
      throw new Error("Expected two Nodes in connections array")
    }

    if(connections[0]?.name){
      const nodeName = connections[0].name
      if(!nameMap.has(nodeName))throw new Error("Referenced Node was not found")

      connections[0] = nameMap.get(nodeName).id
    }else if(!connections[0]?.id){
      connections[0] = connections[0].id
    }else{
      throw new Error("Invisible Node expects an id or name of connected Node.")
    }

    if(connections[1]?.name){
      const nodeName = connections[1].name
      if(!nameMap.has(nodeName))throw new Error("Referenced Node was not found")

      connections[1] = nameMap.get(nodeName).id
    }else if(!connections[1]?.id){
      connections[1] = connections[1].id
    }else{
      throw new Error("Invisible Node expects an id or name of connected Node.")
    }

    invisibleNode.connectedNodes = connections
    await invisibleNode.save()
  }

  // Save new nodes and update the nodes array to have the resolver
  for(let i = 0; i < nodes.length; i++) {
    nodes[i] = new Node(nodes[i], context)
  }

  // Return the array of resolvers
  return nodes
}

// Create a database for invisible nodes
// Every new node comes with it's own set of invisible nodes
// Let's assume every

module.exports = {
  createNodes
}