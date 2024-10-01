const { model } = require("mongoose")
const { buildingSchema } = require("../../../models/building")

const BuildingModel = model("Building", buildingSchema)

const Building = require("../building")

// Define an asynchronous function to fetch all buildings
const getBuildings = async (_, context) => {
  if(!context?.isAuth) throw new Error("Error retrieving Building data. You are not authenticated.")
  const buildings = await BuildingModel.find() || []

  const response = []
  for(const building of buildings) {
    response.push(new Building(building, context))
  }
  return response
}

// Export the 'getBuildings' function to make it accessible from other modules
module.exports = { getBuildings }