const userSchema = `
  type User {
    username: String
    email: String!
    roles: [String]!
    buildings: [Building]!
    createdAt: String
    updatedAt: String
  }
`

module.exports = {
  schema: userSchema
}