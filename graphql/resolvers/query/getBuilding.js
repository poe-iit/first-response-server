const Building = require("../building")

// Define an asynchronous function to fetch a building based on the provided 'id'
// The function expects an object with an 'id' property
const getBuilding = async ({ id }, context) => {
  if(!context?.isAuth) throw new Error("Error retrieving Building data. You are not authenticated.")
  const building = await Building.build(id, context)
  return building
}

// Export the 'getBuilding' function to make it accessible from other modules
module.exports = { getBuilding }