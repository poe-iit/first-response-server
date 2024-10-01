const { model } = require("mongoose")
const { floorSchema } = require("../../../models/floor")

const FloorModel = model("Floor", floorSchema)

const Floor = require("../floor")

// Define an asynchronous function to fetch all floors
const getFloors = async (_, context) => {
  if(!context?.isAuth) throw new Error("Error retrieving Floor data. You are not authenticated.")
  const floors = await FloorModel.find() || []

  const response = []
  for (const floor of floors) {
    response.push(new Floor(floor, context))
  }
  return response
}

// Export the 'getFloors' function to make it accessible from other modules
module.exports = { getFloors }