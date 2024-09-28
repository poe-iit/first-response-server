const Building = require("../building")

// Define an asynchronous function to fetch a building based on the provided 'id'
// The function expects an object with an 'id' property
const getBuilding = async ({ id }) => {
  const building = await Building.build(id)
  return building
}

// Export the 'getBuilding' function to make it accessible from other modules
module.exports = { getBuilding }