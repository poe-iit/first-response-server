const signatureSchema = `
  type Signature {
    signature: String!
    timeStamp: String!
  }
`

module.exports = {
  schema: signatureSchema
}