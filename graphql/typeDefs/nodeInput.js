const createNodeInputSchema = `
  input CreateNodeInput {
    name: String!
    state: String!
    isExit: Boolean!
    ui: NodeUIInput!
  }
`
// I need operation so I can know what to do with the node
// Default is create

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