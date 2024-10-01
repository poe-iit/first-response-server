const { model } = require("mongoose")
const { userSchema } = require("../../../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = model("User", userSchema)

const User = require("../user")

// Define an asynchronous function to authenticate a user based on the provided 'email' and 'password'
// The function expects an object with an 'email' and 'password' property
const loginUser = async ({ email, password }, context) => {
  const user = await UserModel.findOne({ email })

  if (!user) {
    throw new Error(`'No user with email: ${email} found`)
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    throw new Error("Invalid password")
  }

  const userId = user.id
  const roles = user.roles

  const token = jwt.sign({ userId, roles }, process.env.ACCESS_SECRET, { expiresIn: '3d' })

  context.response.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
  
  context.isAuth = true
  context.user = {
    userId,
    roles
  }
  
  return new User(user, context)
}

// Export the 'loginUser' function to make it accessible from other modules
module.exports = { loginUser }