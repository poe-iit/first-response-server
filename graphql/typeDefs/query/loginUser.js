const loginUserSchema = `
  loginUser(email: String!, password: String!): User
`

module.exports = {
  schema: loginUserSchema
}