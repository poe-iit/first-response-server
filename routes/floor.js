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


function getDistance (start, end) {
  return Math.abs(start.x - end.x) + Math.abs(start.y - end.y)
}

function sendUpdate(floors) {
  if(floors === null){
    res.status(400).json({
      "message": "Floor not found"
    })
    return
  }
  const nodes = floors.nodes
  const exits = []
  for(const [key, node] of nodes){
    if(node.isExit && node.state !== "compromised")exits.push(key)
  }
  const distances = {
    "safe": {},
    "compromised": {}
  }
  for(const exit of exits){
    const queue = [exit]
    const dist = {[exit]: [0, exit]}
    while(queue.length){
      const node = queue.pop()
      if(nodes.get(node).state === "compromised")continue
      for(const neighbor of nodes.get(node).connections){
        if(!(neighbor in dist) || dist[neighbor][0] > getDistance(nodes.get(neighbor).ui, nodes.get(node).ui) + dist[node][0]){
          dist[neighbor] = [getDistance(nodes.get(neighbor).ui, nodes.get(node).ui) + dist[node][0], node]
          queue.push(neighbor)
          queue.sort((a,b) => dist[b][0] - dist[a][0])
        }
      }
    }
    distances["safe"][exit] = dist
  }
  for(const exit of exits){
    const queue = [exit]
    const dist = {[exit]: [0, exit]}
    while(queue.length){
      const node = queue.pop()
      for(const neighbor of nodes.get(node).connections){
        if(!(neighbor in dist) || dist[neighbor][0] > getDistance(nodes.get(neighbor).ui, nodes.get(node).ui) + dist[node][0]){
          dist[neighbor] = [getDistance(nodes.get(neighbor).ui, nodes.get(node).ui) + dist[node][0], node]
          queue.push(neighbor)
          queue.sort((a,b) => dist[b][0] - dist[a][0])
        }
      }
    }
    distances["compromised"][exit] = dist
  }
  for(const nodeId in subscriptions["nodes"]){
    if(!nodes.has(nodeId)){
      subscriptions["nodes"][nodeId].send("NS")
    }
    let dir, stuck = true
    for(const exit in distances["safe"]){
      if(nodeId in distances["safe"][exit]){
        if(!dir || dir[0] > distances["safe"][exit][nodeId][0]){
          dir = distances["safe"][exit][nodeId]
          stuck = false
        }
      }
    }
    if(!dir){
      for(const exit in distances["compromised"]){
        if(nodeId in distances["compromised"][exit]){
          if(!dir || dir[0] > distances["compromised"][exit][nodeId][0]){
            dir = distances["compromised"][exit][nodeId]
          }
        }
      }

    }

    let direction
    const key = nodeId+"->"+(dir ? dir[1] : "")
    if(floors.paths.has(key)){
      const axis = floors.paths.get(key)
      if(axis === "x"){
        if(nodes.get(nodeId).ui.x > nodes.get(dir[1]).ui.x)direction = "L"
        else direction = "R"
      }else{
        if(nodes.get(nodeId).ui.y > nodes.get(dir[1]).ui.y)direction = "U"
        else direction = "D"
      }
    }else{
      direction = "N"
    }
    subscriptions["nodes"][nodeId].send(direction + (
      nodes?.get(nodeId)?.state === "compromised" ? "C" : (stuck ? "T" : "S")
    ))
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
  sendUpdate(floor)
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