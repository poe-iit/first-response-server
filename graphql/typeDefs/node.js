const nodeSchema = `
  type Node {
    state: String!
    isExit: Boolean!
    connections: [String]!
    ui: NodeUI
  }
`

module.exports = {
  schema: nodeSchema
}