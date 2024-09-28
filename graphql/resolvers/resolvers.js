// Mutations
const { createUser } = require("./mutation/createUser")

// Queries
const { generateSignature } = require("./query/generateSignature")
const { getBuilding } = require("./query/getBuilding")
const { getBuildings } = require("./query/getBuildings")
const { getFloor } = require("./query/getFloor")
const { getFloors } = require("./query/getFloors")
const { loginUser } = require("./query/loginUser")

// Subscriptions
const { floorUpdate } = require("./subscription/floorUpdate")
const { sendHello } = require("./subscription/sendHello")

// Resolver
const resolvers = {
  createUser,
  generateSignature,
  getBuilding,
  getBuildings,
  getFloor,
  getFloors,
  loginUser,
  subscription: {
    sendHello,
    floorUpdate
  }
}

module.exports = {
  resolvers
}