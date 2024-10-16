// Change this to update Floor

const updateFloorPlanSchema = `
  updateFloorPlan(createNodeInputs: [CreateNodeInput]!, createInvisibleNodeInputs: [CreateInvisibleNodeInput]!,updateNodeInputs: [UpdateNodeInput]!, updateInvisibleNodeInputs: [UpdateInvisibleNodeInput]!, id: ID!): [Node]
`

module.exports = {
  schema: updateFloorPlanSchema
}