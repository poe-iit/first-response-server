// Add more variables and make them optional(like roles etc.)

const createUserSchema = `
  createUser(email: String!, password: String!): User
`

module.exports = {
  schema: createUserSchema
}