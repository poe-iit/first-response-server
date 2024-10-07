const createBuildingInputSchema = `
  input CreateBuildingInput {
    name: String!
  }
`

const updateBuildingInputSchema = `
  input UpdateBuildingInput {
    id: ID!
    name: String
    isDeleted: Boolean
  }
`

module.exports = {
  createBuildingInput: {
    schema: createBuildingInputSchema
  },
  updateBuildingInput: {
    schema: updateBuildingInputSchema
  }
}