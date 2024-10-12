// Mutations
const { createBuilding } = require("./mutation/createBuilding")
const { createFloor } = require("./mutation/createFloor")
const { createNode } = require("./mutation/createNode")
const { createNodes } = require("./mutation/createNodes")
const { createUser } = require("./mutation/createUser")
const { updateBuilding } = require("./mutation/updateBuilding")
const { updateFloor } = require("./mutation/updateFloor")
const { updateNode } = require("./mutation/updateNode")

// Queries
const { generateSignature } = require("./query/generateSignature")
const { getBuilding } = require("./query/getBuilding")
const { getBuildings } = require("./query/getBuildings")
const { getFloor } = require("./query/getFloor")
const { getFloors } = require("./query/getFloors")
const { loginUser } = require("./query/loginUser")
const { validateSession } = require("./query/validateSession")

// Subscriptions
const { floorUpdate } = require("./subscription/floorUpdate")
const { sendHello } = require("./subscription/sendHello")

// Resolver
const resolvers = {
  createBuilding,
  createFloor,
  createNode,
  createNodes,
  createUser,
  updateBuilding,
  updateFloor,
  updateNode,
  generateSignature,
  getBuilding,
  getBuildings,
  getFloor,
  getFloors,
  loginUser,
  validateSession,
  subscription: {
    sendHello,
    floorUpdate
  }
}

module.exports = {
  resolvers
}