const nodeSchema = `
  type Node {
    id: String!
    name: String!
    state: String!
    isExit: Boolean!
    connections: [Node]!
    ui: NodeUI
  }
`

module.exports = {
  schema: nodeSchema
}