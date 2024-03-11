const router = require("express").Router()
const { building }= require("../models/building")
const { floor } = require("../models/floor")

const Building = building()
const Floor = floor()

router.get("/", async (req, res) => {
  const buildings = await Building.find()
  res.status(200).json(buildings)
})

router.post("/", async (req, res) => {
  const building = new Building(req.body)
  await building.save()
  res.status(200).json({ message: "Building created" })
})

router.put("/:id", async (req, res) => {
  const building = await Building.findByIdAndUpdate(req.params.id, req.body)
  res.status(200).json({message: "Building updated"})
})

router.delete("/:id", async (req, res) => {
  await Building.findByIdAndDelete(req.params.id)
  await Floor.deleteMany({ building: req.params.id })
  res.status(200).json({ message: "Building deleted" })
})

router.get("/:id", async (req, res) => {
  const building = await Building.findById(req.params.id)
  res.status(200).json(building)
})

module.exports = router