const invisibleNodeSchema = `
  type InvisibleNode {
    id: ID!
    connectedNodes: [Node]!
    createdAt: String!
    updatedAt: String!
  }
`

module.exports = {
  schema: invisibleNodeSchema
}