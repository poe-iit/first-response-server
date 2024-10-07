const { model } = require("mongoose")
const { buildingSchema } = require("../../../models/building")
const BuildingModel = model("Building", buildingSchema )

const Building = require("../building")

const updateBuilding = async ({
  updateBuildingInput: { id, name, isDeleted }
}, context) => {
  if(!context?.isAuth) throw new Error("Error updating Building. You are not authenticated.")

  const building = await BuildingModel.findById(id)

  if(!building) {
    throw new Error("Building not found")
  }

  if(isDeleted) {
    await building.deleteOne()
    return null
  }
  
  building.name = name
  
  await building.save()
  return new Building(building, context)
}

module.exports = {
  updateBuilding
}