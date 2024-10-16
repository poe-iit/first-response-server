const createFloorInputSchema = `
  input CreateFloorInput {
    name: String!
    buildingId: String!
    image: FloorImageInput
  }
`

const updateFloorInputSchema = `
  input UpdateFloorInput {
    id: ID!
    name: String
    image: FloorImageInput
    buildingId: String
    isDeleted: Boolean
  }
`

module.exports = {
  createFloorInput: {
    schema: createFloorInputSchema
  },
  updateFloorInput: {
    schema: updateFloorInputSchema
  }
}