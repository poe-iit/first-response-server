// Mutations
const { createBuilding } = require("./mutation/createBuilding")
const { createFloor } = require("./mutation/createFloor")
const { updateFloorPlan } = require("./mutation/updateFloorPlan")
const { createUser } = require("./mutation/createUser")
const { updateBuilding } = require("./mutation/updateBuilding")
const { updateFloor } = require("./mutation/updateFloor")
const { updateNode } = require("./mutation/updateNode")

// Queries
const { generateSignature } = require("./query/generateSignature")
const { getBuilding } = require("./query/getBuilding")
const { getBuildings } = require("./query/getBuildings")
const { getFloor } = require("./query/getFloor")
const { getFloorPlan } = require("./query/getFloorPlan")
const { getFloors } = require("./query/getFloors")
const { loginUser } = require("./query/loginUser")
const { logoutUser } = require("./query/logoutUser")
const { validateSession } = require("./query/validateSession")

// Subscriptions
const { floorUpdate } = require("./subscription/floorUpdate")
const { sendHello } = require("./subscription/sendHello")

// Resolver
const resolvers = {
  createBuilding,
  createFloor,
  createUser,
  updateBuilding,
  updateFloor,
  updateFloorPlan,
  updateNode,
  generateSignature,
  getBuilding,
  getBuildings,
  getFloor,
  getFloorPlan,
  getFloors,
  loginUser,
  logoutUser,
  validateSession,
  subscription: {
    sendHello,
    floorUpdate
  }
}

module.exports = {
  resolvers
}