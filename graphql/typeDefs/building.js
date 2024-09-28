const buildingSchema = `
  type Building {
    id: ID!
    name: String!
    floors: [Floor]!
    createdAt: String!
    updatedAt: String!
  }
`

module.exports = {
  schema: buildingSchema
}