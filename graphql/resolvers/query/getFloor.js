const Floor = require("../floor")

// args, context, info

// Define an asynchronous function to fetch a floor based on the provided 'id'
// The function expects an object with an 'id' property
const getFloor = async ({ id }) => {
  const floor = await Floor.build(id)
  return floor
}

// Export the 'getFloor' function to make it accessible from other modules
module.exports = { getFloor }