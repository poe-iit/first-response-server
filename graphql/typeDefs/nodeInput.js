const createNodeInputSchema = `
  input CreateNodeInput {
    name: String!
    state: String!
    isExit: Boolean!
    ui: NodeUIInput
    floorId: ID!
  }
`

const nodeReferenceInputSchema = `
  input NodeReferenceInput {
    name: String
    id: String
  }
`

const updateNodeInputSchema = `
  input UpdateNodeInput {
    id: ID!
    name: String
    state: String
    isExit: Boolean
    ui: NodeUIInput
    isDeleted: Boolean
  }
`

module.exports = {
  createNodeInput: {
    schema: createNodeInputSchema
  },
  nodeReferenceInput: {
    schema: nodeReferenceInputSchema
  },
  updateNodeInput: {
    schema: updateNodeInputSchema
  }
}