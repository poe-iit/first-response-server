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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'No user found' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_SECRET, { expiresIn: '3d' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if(existingUser) {
      return res.status(400).json({ error: 'Email is currently in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({ email, password: hashedPassword, roles: ["user"] });

    const token = jwt.sign({ userId: newUser.id, roles: ["user"] }, process.env.ACCESS_SECRET, { expiresIn: '3d' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router