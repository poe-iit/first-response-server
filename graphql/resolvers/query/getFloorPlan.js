const FloorPlan = require("../floorPlan")

// args, context, info

// Define an asynchronous function to fetch a floor based on the provided 'id'
// The function expects an object with an 'id' property
const getFloorPlan = async ({ id }, context) => {
  if(!context?.isAuth) throw new Error("Error retrieving Floor data. You are not authenticated.")
  
  const floorPlan = await FloorPlan.build(id, context)

  return floorPlan
}

// Export the 'getFloor' function to make it accessible from other modules
module.exports = { getFloorPlan }