const { buildSchema } = require("graphql");

const createUser = require("./mutation/createUser")

const generateSignature = require("./query/generateSignature");
const getBuilding = require("./query/getBuilding")
const getBuildings = require("./query/getBuildings")
const getFloor = require("./query/getFloor")
const getFloors = require("./query/getFloors")
const loginUser = require("./query/loginUser")

const floorUpdate = require("./subscription/floorUpdate");
const sendHello = require("./subscription/sendHello")

const building = require("./building")
const floor = require("./floor")
const floorImage = require("./floorImage")
const hello = require("./hello")
const node = require("./node")
const nodeUI = require("./nodeUI")
const signature = require("./signature");
const user = require("./user");

const schema = buildSchema(`
  type Mutation {
    ${createUser.schema}
  }

  type Query {
    ${generateSignature.schema}
    ${getBuilding.schema}
    ${getBuildings.schema}
    ${getFloor.schema}
    ${getFloors.schema}
    ${loginUser.schema}
  }

  type Subscription {
    ${sendHello.schema}
    ${floorUpdate.schema}
  }

  ${building.schema}
  ${floor.schema}
  ${floorImage.schema}
  ${hello.schema}
  ${node.schema}
  ${nodeUI.schema}
  ${signature.schema}
  ${user.schema}
`)

module.exports = {
  schema
}