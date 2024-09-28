const { model } = require("mongoose")
const { buildingSchema } = require("../../models/building")
const BuildingModel = model("Building", buildingSchema )

// Define a 'Building' class to encapsulate building-related operations and data
class Building {
  static async build(buildingId) {
    const building = await BuildingModel.findById(buildingId)

    if (!building) {
      throw new Error("Building not found")
    }
    return new Building(building)
  }

  constructor(building) {
    this.building = building

    this.id = building.id
    this.name = building.name
    this.createdAt = building.createdAt
    this.updatedAt = building.updatedAt
  }


  async floors() {
    const Floor = require("./floor")
    const floors = this.building.floors || []

    const response = []
    for(const floor of floors) {
      response.push(await Floor.build(floor.id))
    }
    return response
  }
}

// Export the Building class for use in other parts of the application
module.exports = Building