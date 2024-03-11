const router = require("express").Router()
const Log = require("../models/log")

router.get("/", async (req, res) => {
  const logs = await Log.find()
  res.status(200).json(logs)
})

router.post("/", async (req, res) => {
  const log = Log(req.body)
  await log.save()
  res.status(200).json(log)
})

router.get("/:floor", async (req, res) => {
  const logs = await Log.find({ floor: req.params.floor })
  res.status(200).json(logs)
})

module.exports = router