const router = require("express").Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../models/user')
const { model } = require("mongoose")

const userModel = model("User", userSchema)


router.get("/", (req, res) => {
  console.log(req.isAuth, req.user)
  res.status(200).json({ message: "Hello World!" })
})

module.exports = router