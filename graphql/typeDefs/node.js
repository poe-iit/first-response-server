const nodeSchema = `
  type Node {
    id: String!
    name: String!
    state: String!
    isExit: Boolean!
    connections: [String]! #Work on converting this into [Node]
    ui: NodeUI
  }
`

module.exports = {
  schema: nodeSchema
}