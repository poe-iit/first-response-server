const router = require("express").Router()
const { floor } = require("../models/floor")
const { building } = require("../models/building")

const Building = building()
const Floor = floor()

const handleFloorUpdate = (floor) => {
  if(subscriptions["floors"][floor._id.toString()]){
    subscriptions["floors"][floor._id.toString()].forEach((ws) => {
      ws.send(JSON.stringify(floor))
    })
  }
}

router.get("/", async (req, res) => {
  const floors = await Floor.find()
  res.status(200).json(floors)
})

router.post("/", async (req, res) => {
  const floor = Floor(req.body)
  await Building.findByIdAndUpdate(floor.building, { $addToSet: { floors: {
    id: floor._id.toString(),
    name: floor.name
  } } });
  await floor.save()
  res.status(200).json({ message: "Floor created" })
})

router.put("/:id", async (req, res) => {
  const floor = await Floor.findByIdAndUpdate(req.params.id, req.body, { new: true })
  await Building.findOneAndUpdate(
    { _id: floor.building, "floors.id": req.params.id },
    { $set: { "floors.$.name": floor.name } }
  );
  handleFloorUpdate(floor)
  res.status(200).json({ message: "Floor updated" })
})

router.put("/:id/nodes", async (req, res) => {
  const updateQuery = {};

  for (let [key, value] of Object.entries(req.body)) {
    updateQuery[`nodes.${key}.state`] = value;
  }
  const floor = await Floor.findByIdAndUpdate(req.params.id, updateQuery, { new: true })
  handleFloorUpdate(floor)
  res.status(200).json({ message: "Node(s) updated" })

  // Update all clients watching with the new state
})

router.delete("/:id", async (req, res) => {
  const floor = await Floor.findById(req.params.id)
  await Floor.findByIdAndDelete(req.params.id)
  await Building.findByIdAndUpdate(floor.building, { $pull: { floors: {
    id: req.params.id,
    name: floor.name
  } } });
  res.status(200).json({ message: "Floor deleted" })
})

router.get("/:id", async (req, res) => {
  Floor.findById(req.params.id)
  .then((floor) => {
    res.status(200).json(floor)
  })
  .catch((err) => {
    res.status(500).json({
      error: err
    })
  })
})

module.exports = router