const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
  // Boring stuffs to turn the cookie into an object
  const cookieSplit = String(req.headers.cookie).split('; ')
  const cookieObj = {}
  for(const str of cookieSplit){
    const [key, value] = str.split('=')
    cookieObj[key] = value
  }

  // Get the encrypted token
  let token =  cookieObj['token']

  if(token == null || token === '' || token === undefined){
    const authHeader = req?.headers['authorization'] || req?.headers['Authorization']
  
    if (authHeader) {
      token = authHeader.split(' ')[1]
    }
  }



  // Check if the token is null or empty
  if (token === null || token === '' || token === undefined) {
    // If the token is null or empty, the user is not authenticated
    req.isAuth = false;
    // Tell the request to move along to it's actual destination(the route it was sent to)
    return next();
  }

  // Fancy function to verify the token
  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    // If the token is invalid, the user is not authenticated
    if (err) {
      req.isAuth = false;
      return next();
    }

    // If the token is valid, the user is authenticated
    req.isAuth = true;
    req.user = user;
    next();
  });
}
module.exports = authenticateToken;