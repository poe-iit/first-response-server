const crypto = require("crypto")
const Signature = require("../signature")

// Define an asynchronous function to generate a cryptographic signature based on the provided 'id'
// The function expects an object with an 'id' property
const generateSignature = async ({ id }) => {
  const timestamp = Math.round((new Date()).getTime() / 1000)

  const params_to_sign = {
    public_id: id,
    timestamp
  }

  const param_string = Object.keys(params_to_sign)
    .sort()
    .map(key => `${key}=${params_to_sign[key]}`)
    .join("&")

  const signature = crypto.createHash("sha1").update(param_string+process.env.CLOUDINARY_SECRET).digest("hex")

  const response = new Signature(signature, timestamp)
  return response
}


// Export the 'generateSignature' function to make it accessible from other modules
module.exports = { generateSignature }