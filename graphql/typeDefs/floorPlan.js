const floorPlanSchema = `
  type FloorPlan {
    id: ID!
    name: String!
    building: Building!
    nodes: [Node]!
    invisibleNodes: [InvisibleNode]!
    image: FloorImage
    createdAt: String!
    updatedAt: String!
  }
`

module.exports = {
  schema: floorPlanSchema
}