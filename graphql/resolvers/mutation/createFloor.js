const { model } = require("mongoose")
const { floorSchema } = require("../../../models/floor")
const FloorModel = model("Floor", floorSchema )

const Floor = require("../floor")

const createFloor = async ({
  createFloorInput: { name, buildingId, image }
}, context) => {
  if(!context?.isAuth) throw new Error("Error creating Building. You are not authenticated.")

  let floor = await FloorModel.findOne({ name, building: buildingId })
  if(floor) throw new Error("Floor already exists")

  floor = new FloorModel({ name, building: buildingId, image })

  await floor.save()

  return new Floor(floor, context)
}

module.exports = {
  createFloor
}