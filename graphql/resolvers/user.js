const { model } = require("mongoose")
const { userSchema } = require("../../models/user")

const UserModel = model("User", userSchema)

// Define a 'User' class to encapsulate user-related operations and data
class User {
  // Create a way to get user with either userId or userEmail
  // Make the class more... flexible
  static async build(userId, context) {
    if(!context?.isAuth) throw new Error("Error retrieving User data. You are not authenticated.")
    const user = await UserModel.findById(userId)

    if (!user) {
      throw new Error(`User ${userId} not found`)
    }
    return new User(user, context)
  }

  constructor(user, context) {
    if(!context.isAuth) throw new Error("Error retrieving data. You are not authenticated.")
    this.context = context
    this.user = user

    this.id = user.id
    this.username = user.username
    this.email = user.email
    // Intentionally skipped user.password
    this.roles = user.roles
    
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }

  async buildings() {
    const Building = require("./building")

    const buildings = this.user.buildings.map(async buildingId => await Building.build(buildingId, this.context))

    return buildings
  }
}

// Export the User class for use in other parts of the application
module.exports = User