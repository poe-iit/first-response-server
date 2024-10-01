const authParse = require("../utils/authParse")

// Middleware function to authenticate tokens in incoming requests
function authenticateToken(req, _, next) {
  authParse(req)
  return next() // Call the next middleware or route handler
}

// Export the authenticateToken function for use as middleware in other parts of the application
module.exports = authenticateToken