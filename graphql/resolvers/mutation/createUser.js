const { model } = require("mongoose")
const { userSchema } = require("../../../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = model("User", userSchema)

const User = require("../user")

// Define an asynchronous function to create a user based on the provided 'email' and 'password'
// The function expects an object with an 'email' and 'password' property
const createUser = async ({ email, password }, context) => {
  const existingUser = await UserModel.findOne({ email })

  if(existingUser) {
    throw new Error('Email is currently in use' )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await UserModel.create({ email, password: hashedPassword, roles: ["user"] })
  
  const userId = newUser.id
  const roles = ["user"]

  const token = jwt.sign({ userId, roles }, process.env.ACCESS_SECRET, { expiresIn: '3d' })

  context.response.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })

  context.isAuth = true
  context.user = {
    userId,
    roles
  }

  return new User(newUser)
}

// Export the 'createUser' function to make it accessible from other modules
module.exports = { createUser }