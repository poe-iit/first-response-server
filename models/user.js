const { Schema } = require("mongoose")
const { ObjectId } = require("mongoose").Types

// username, email, password, roles, buildings

const userSchema = new Schema({
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    required: true
  },
  buildings: [{
    id: {
      type: ObjectId,
      ref: "Building"
    },
    name: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
})

module.exports = userSchema