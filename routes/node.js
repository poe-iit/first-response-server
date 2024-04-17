const router = require("express").Router()
const { floor } = require("../models/floor")

const Floor = floor()

// Implement a priority queue later (for fun)

const getDistance = (start, end) => {
  return Math.abs(start.x - end.x) + Math.abs(start.y - end.y)
}

router.get("/direction", async (req, res) => {
  const { nodeId, floorId } = req.query
  const floors = await Floor.findById(floorId)
  if(floors === null){
    res.status(400).json({
      "message": "Floor not found"
    })
    return
  }
  const nodes = floors.nodes
  if(!nodes.has(nodeId)){
    res.status(400).json({
      "message": "Node not found"
    })
    return
  }
  const exits = []
  for(const [key, node] of nodes){
    if(node.isExit && node.state !== "compromised")exits.push(key)
  }
  const distances = {}
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
          queue.sort((a,b) => dist[b] - dist[a])
        }
      }
    }
    distances[exit] = dist
  }
  let dir
  for(const exit in distances){
    if(nodeId in distances[exit]){
      if(!dir || dir[0] > distances[exit][nodeId][0])dir = distances[exit][nodeId]
    }
  }
  if(!dir){
    for(const exit of exits){
      const queue = [exit]
      const dist = {[exit]: [0, exit]}
      while(queue.length){
        const node = queue.pop()
        for(const neighbor of nodes.get(node).connections){
          if(!(neighbor in dist) || dist[neighbor][0] > getDistance(nodes.get(neighbor).ui, nodes.get(node).ui) + dist[node][0]){
            dist[neighbor] = [getDistance(nodes.get(neighbor).ui, nodes.get(node).ui) + dist[node][0], node]
            queue.push(neighbor)
            queue.sort((a,b) => dist[b] - dist[a])
          }
        }
      }
      distances[exit] = dist
    }
    for(const exit in distances){
      if(nodeId in distances[exit]){
        if(!dir || dir[0] > distances[exit][nodeId][0])dir = distances[exit][nodeId]
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
  res.status(200).json(direction)
})

module.exports = router