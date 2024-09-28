// Import the jsonwebtoken library to handle JWT verification
const jwt = require('jsonwebtoken')

// Middleware function to authenticate tokens in incoming requests
function authenticateToken(req, _, next) {
  // Parse cookies from the request headers and create an object to store them
  const cookieSplit = String(req.headers.cookie).split('; ')
  const cookieObj = {}

  // Loop through each cookie and split it into key-value pairs
  for(const str of cookieSplit){
    const [key, value] = str.split('=')
    cookieObj[key] = value
  }

  // Extract the 'token' from the cookies
  let token =  cookieObj['token']

  // If the token is missing or empty, try to get it from the Authorization header
  if(token == null || token === '' || token === undefined){
    // Check the Authorization header (supporting different capitalizations)
    const authHeader = req?.headers['authorization'] || req?.headers['Authorization']
  
    // If the Authorization header is present, extract the token part
    if (authHeader) {
      token = authHeader.split(' ')[1]
    }
  }

  // If no token is found, mark the request as unauthenticated and move to the next middleware
  if (token === null || token === '' || token === undefined) {
    req.isAuth = false
    return next()
  }

  // Verify the token using the secret stored in environment variables
  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    // If the token is invalid, set isAuth to false and proceed to the next middleware
    if (err) {
      req.isAuth = false
      return next()
    }

    // If the token is valid, mark the request as authenticated and attach the decoded user info
    req.isAuth = true
    req.user = user
    next() // Call the next middleware or route handler
  })
}

// Export the authenticateToken function for use as middleware in other parts of the application
module.exports = authenticateToken