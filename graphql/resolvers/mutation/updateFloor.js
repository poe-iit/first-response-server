const { model } = require("mongoose")
const { floorSchema } = require("../../../models/floor")
const FloorModel = model("Floor", floorSchema )

const Floor = require("../floor")

const updateFloor = async ({
  updateFloorInput: { id, name, buildingId, image, isDeleted }
}, context) => {
  if(!context?.isAuth) throw new Error("Error updating Floor. You are not authenticated.")

  const floor = await FloorModel.findById(id)

  if(!floor) {
    throw new Error(`Floor ${id} not found`)
  }

  if(isDeleted) {
    await floor.deleteOne() 
    return null
  }
  
  floor.name = name
  floor.building = buildingId
  floor.image = image

  await floor.save()
  return new Floor(floor, context)

}

module.exports = {
  updateFloor
}