const createNodesSchema = `
  createNode(createNodeInputs: [CreateNodeInput]!, invisibleNodeInputs: [InvisibleNodeInput]!): [Node]
`

module.exports = {
  schema: createNodesSchema
}