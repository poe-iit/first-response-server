const { model } = require("mongoose")
const { buildingSchema } = require("../../../models/building")
const BuildingModel = model("Building", buildingSchema )

const Building = require("../building")

const createBuilding = async ({ createBuildingInput: { name }}, context) => {
  if(!context?.isAuth) throw new Error("Error creating Building. You are not authenticated.")

  let building = await BuildingModel.findOne({ name })
  if(building) throw new Error("Building already exists")

  // Add error handlng 
  building = new BuildingModel({ name })
  await building.save()

  return new Building(building, context)
}

module.exports = {
  createBuilding
}