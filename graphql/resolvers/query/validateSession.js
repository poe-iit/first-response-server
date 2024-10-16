const User = require("../user")

const validateSession = async ({}, context) => {
  if(!context?.isAuth) throw new Error("Error validating session. You are not authenticated.")
  
  const user = await User.build(context.user.userId, context)
  return user
}

module.exports = {
  validateSession
}