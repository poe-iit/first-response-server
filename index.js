const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const WebSocket = require('ws');
const server = require("http").createServer()

const building = require("./routes/building")
const floor = require("./routes/floor")
const log = require("./routes/log")
const node = require("./routes/node")

const floorModel = require("./models/floor")

const Floor = floorModel.floor()

const wss = new WebSocket.Server({ server: server });

global.subscriptions = require("./config")

dotenv.config()

const app = express()

server.on('request', app)

// Route for logs
// Route for buildings
//   Route for floors
//     Route for nodes/exit signs
// Websocket for floor updates

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/",(req, res) => {
  res.status(200).json({
    message: "Hello World!"
  })
})

function handleFloorUpdate(floor) {
  if(subscriptions["floors"][floor._id.toString()]){
    subscriptions["floors"][floor._id.toString()].forEach((ws) => {
      ws.send(JSON.stringify(floor))
    })
  }
}

function getDistance (start, end) {
  return Math.abs(start.x - end.x) + Math.abs(start.y - end.y)
}

async function updateNode(nodeId, state) {
  const floor = await Floor.findById(subscriptions["floor"])
  if(floor){
    if(!floor.nodes.has(nodeId)){
      return
    }
    const node = floor.nodes.get(nodeId)
    node.state = state === "C" ? "compromised" : "safe"
    floor.nodes.set(nodeId, node)
    await floor.save()
    sendUpdate(floor)
    handleFloorUpdate(floor)
  }
}

function sendUpdate(floors) {
  if(floors === null){
    res.status(400).json({
      "message": "Floor not found"
    })
    return
  }
  const nodes = floors.nodes
  // if(!nodes.has(nodeId)){
  //   res.status(400).json({
  //     "message": "Node not found"
  //   })
  //   return
  // }
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
          queue.sort((a,b) => dist[b] - dist[a])
        }
      }
    }
    distances["safe"][exit] = dist
  }
  // let dir, stuck = true
  // for(const exit in distances){
  //   if(nodeId in distances[exit]){
  //     if(!dir || dir[0] > distances[exit][nodeId][0]){
  //       dir = distances[exit][nodeId]
  //       stuck = false
  //     }
  //   }
  // }
  // if(!dir){
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
    distances["compromised"][exit] = dist
  }
    // for(const exit in distances){
    //   if(nodeId in distances[exit]){
    //     if(!dir || dir[0] > distances[exit][nodeId][0])dir = distances[exit][nodeId]
    //   }
    // }
  // }
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
      nodes.get(nodeId).state === "compromised" ? "C" : (stuck ? "T" : "S")
    ))
  }
}

wss.on('connection', function connection(ws) {
  ws.on('message', async function incoming(message) {
    try{
      message = JSON.parse(message)
    }catch(err){
      message = message.toString()
    }
    if(message?.type === "floor-update"){
      if(subscriptions["floors"][message.floorId]) subscriptions["floors"][message.floorId].push(ws)
      else subscriptions["floors"][message.floorId] = [ws]
  
      
      Floor.findById(message.floorId)
      .then((floor) => {
        ws.send(JSON.stringify( floor ))
      })
      .catch((err) => {
        ws.send(JSON.stringify({
          error: err
        }))
      })
    }
    else if(message.slice(0, 8) === "@SOTERIA"){
      const mesg = message.split(",")
      subscriptions["nodes"][mesg[1]] = ws
      if(mesg.length > 2)await updateNode(mesg[1], mesg[2])
      else ws.send("NN")
      // Compromise or not
      // Update all nodes with new state
    }else{
      ws.send(message)
    }
    // switch(message?.type){
    //   case "floor-update":
    //     break
    //   default:
    //     ws.send(message)
    //     break
    // }
  });
});

app.use("/building", building)
app.use("/floor", floor)
app.use("/log", log)
app.use("/node", node)

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("MongoDB connected")
  server.listen(process.env.PORT || 5000, () => {
    console.log("Server started on http://localhost:" + (process.env.PORT || 5000))
  })
}).catch((err) => {
  console.log(err)
})