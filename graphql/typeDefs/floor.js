const floorSchema = `
  type Floor {
    id: ID!
    name: String!
    building: Building!
    nodes: [Node]!
    image: FloorImage
    createdAt: String!
    updatedAt: String!
  }
`

module.exports = {
  schema: floorSchema
}