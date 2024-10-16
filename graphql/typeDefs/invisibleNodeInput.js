// Remember to send the ID accross
// Rename connectedNodes to connections for consistency, in the schemas, resolvers, and website (lots of debugging ahead)

const createInvisibleNodeInputSchema = `
  input CreateInvisibleNodeInput {
    connections: [NodeReferenceInput]!
  }
`

const updateInvisibleNodeInputSchema = `
  input UpdateInvisibleNodeInput {
    id: ID!
    connections: [NodeReferenceInput]
    isDeleted: Boolean
  }
`

// I need operation so I can know what to do with the node
// Default is create

module.exports = {
  createInvisibleNodeInput: {
    schema: createInvisibleNodeInputSchema
  },
  updateInvisibleNodeInput: {
    schema: updateInvisibleNodeInputSchema
  }
}