const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const WebSocket = require('ws');
const server = require("http").createServer()

const building = require("./routes/building")
const floor = require("./routes/floor")
const log = require("./routes/log")

const buildingModel = require("./models/building")
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

wss.on('connection', function connection(ws) {
  ws.on('message', async function incoming(message) {
    message = JSON.parse(message)
    switch(message.type){
      case "floor-update":
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
      
        break
    }
  });
});

app.use("/building", building)
app.use("/floor", floor)
app.use("/log", log)

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("MongoDB connected")
  server.listen(process.env.PORT || 5000, () => {
    console.log("Server started on http://localhost:" + (process.env.PORT || 5000))
  })
}).catch((err) => {
  console.log(err)
})