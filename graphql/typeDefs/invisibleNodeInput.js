// Remember to send the ID accross

const invisibleNodeInputSchema = `
  input InvisibleNodeInput {
    connections: [NodeReferenceInput]!
    floorId: ID!
    ui: NodeUIInput!
  }
`

module.exports = {
  schema: invisibleNodeInputSchema
}