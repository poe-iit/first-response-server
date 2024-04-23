const router = require("express").Router()
const crypto = require("crypto")

router.get("/", (req, res) => {
  const timestamp = Math.round((new Date()).getTime() / 1000)

  const params_to_sign = {
    public_id: req.query.public_id,
    timestamp
  }

  const param_string = Object.keys(params_to_sign)
    .sort()
    .map(key => `${key}=${params_to_sign[key]}`)
    .join("&")

  const signature = crypto.createHash("sha1").update(param_string+process.env.CLOUDINARY_SECRET).digest("hex")
  res.status(200).json({ signature, timestamp })
})

module.exports = router