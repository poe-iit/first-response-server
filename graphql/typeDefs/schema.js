const { buildSchema } = require("graphql");

const createBuilding = require("./mutation/createBuilding")
const createFloor = require("./mutation/createFloor")
const createUser = require("./mutation/createUser")
const updateBuilding = require("./mutation/updateBuilding")
const updateFloor = require("./mutation/updateFloor")
const updateFloorPlan = require("./mutation/updateFloorPlan")
const updateNode = require("./mutation/updateNode")

const generateSignature = require("./query/generateSignature");
const getBuilding = require("./query/getBuilding")
const getBuildings = require("./query/getBuildings")
const getFloor = require("./query/getFloor")
const getFloorPlan = require("./query/getFloorPlan")
const getFloors = require("./query/getFloors")
const loginUser = require("./query/loginUser")
const logoutUser = require("./query/logoutUser");
const validateSession = require("./query/validateSession")

const floorUpdate = require("./subscription/floorUpdate");
const sendHello = require("./subscription/sendHello")

const building = require("./building")
const floor = require("./floor")
const floorPlan = require("./floorPlan")
const floorImage = require("./floorImage")
const hello = require("./hello")
const invisibleNode = require("./invisibleNode")
const node = require("./node")
const nodeUI = require("./nodeUI")
const signature = require("./signature");
const status = require("./status")
const user = require("./user");

const buildingInput = require("./buildingInput")
const floorImageInput = require("./floorImageInput")
const floorInput = require("./floorInput")
const invisibleNodeInput = require("./invisibleNodeInput")
const nodeInput = require("./nodeInput")
const nodeUIInput = require("./nodeUIInput")

const schema = buildSchema(`
  type Mutation {
    ${createBuilding.schema}
    ${createFloor.schema}
    ${createUser.schema}
    ${updateBuilding.schema}
    ${updateFloor.schema}
    ${updateFloorPlan.schema}
    ${updateNode.schema}
  }

  type Query {
    ${generateSignature.schema}
    ${getBuilding.schema}
    ${getBuildings.schema}
    ${getFloor.schema}
    ${getFloorPlan.schema}
    ${getFloors.schema}
    ${loginUser.schema}
    ${validateSession.schema}
    ${logoutUser.schema}
  }

  type Subscription {
    ${sendHello.schema}
    ${floorUpdate.schema}
  }

  ${buildingInput.createBuildingInput.schema}
  ${buildingInput.updateBuildingInput.schema}
  ${floorImageInput.schema}
  ${floorInput.createFloorInput.schema}
  ${floorInput.updateFloorInput.schema}
  ${invisibleNodeInput.createInvisibleNodeInput.schema}
  ${invisibleNodeInput.updateInvisibleNodeInput.schema}
  ${nodeInput.createNodeInput.schema}
  ${nodeInput.nodeReferenceInput.schema}
  ${nodeInput.updateNodeInput.schema}
  ${nodeUIInput.schema}

  ${building.schema}
  ${floor.schema}
  ${floorPlan.schema}
  ${floorImage.schema}
  ${hello.schema}
  ${invisibleNode.schema}
  ${node.schema}
  ${nodeUI.schema}
  ${signature.schema}
  ${status.schema}
  ${user.schema}
`)

module.exports = {
  schema
}