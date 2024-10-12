// Destructure Schema from Mongoose to define a schema for a MongoDB collection
const { Schema } = require("mongoose")

// Destructure ObjectId type from Mongoose to use it as a reference type in the schema
const { ObjectId } = require("mongoose").Types

// Define a schema for a "User" collection
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
    type: ObjectId,
    ref: "Building"
  }],
  accountStatus: {
    type: String,
    required: true
  }
}, {
  // Add createdAt and updatedAt timestamps to the schema automatically
  timestamps: true
})

// Export the user schema as part of an object
module.exports = {
  userSchema
}

// Create a way to clearly define accountStatus, roles, etc.

// Account status: created, active, inactive, blocked
// Roles: Figure out a system for roles