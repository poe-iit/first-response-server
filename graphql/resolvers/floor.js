const { model } = require("mongoose")
const { floorSchema } = require("../../models/floor")

const FloorModel = model("Floor", floorSchema)

// Define a 'Floor' class to encapsulate floor-related operations and data
class Floor {
  static async build(floorId) {
    const floor = await FloorModel.findById(floorId)

    if (!floor) {
      throw new Error(`Floor ${floorId} not found`)
    }
    return new Floor(floor)
  }

  constructor(floor) {
    const Node = require("./node")
    this.floor = floor

    this.id = floor.id
    this.name = floor.name
    const nodes = []
    for(const [id, node] of floor.nodes) {
      const newNode = {
        id: node.id,
        ui: node.ui,  
        state: node.state,
        isExit: node.isExit,
        connections: node.connections,
        name: id
      }
      nodes.push(new Node(newNode))
    }
    this.nodes = nodes
    this.image = floor.image
    this.createdAt = floor.createdAt
    this.updatedAt = floor.updatedAt
  }

  async building() {
    const Building = require("./building")
    const buildingId = this.floor.building
    const building = await Building.build(buildingId)
    return building
  }
}

// Export the Floor class for use in other parts of the application
module.exports = Floor