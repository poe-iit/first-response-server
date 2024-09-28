const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const WebSocket = require('ws');
const server = require("http").createServer()
const authenticate = require("./middleware/authenticate")

const building = require("./routes/building")
const floor = require("./routes/floor")
const log = require("./routes/log")
const node = require("./routes/node")
const generateSignature = require("./routes/generate_signature")
const auth = require("./routes/auth")

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
app.use(authenticate)

// Create a context object for GraphQL to include auth status and user info
const createContext = (req, res) => ({
  response: res,
  isAuth: req.isAuth,
  user: req.user
})

// Routes to test server and publish events on the pubsub system
app.use("/test", test)

// GraphQL API endpoint, enables graphiql UI and sets up schema, resolvers, and context
app.use("/graphql", graphqlHTTP((req, res) => ({
  schema: graphqlSchema,
  rootValue: resolvers,
  context: createContext(req, res),
  graphiql: true
})))

// Connect to MongoDB using the conntextion string from environment variables
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("MongoDB connected")
  server.listen(process.env.PORT || 5000, () => {
    console.log("Server started on http://localhost:" + (process.env.PORT || 5000))
  })
}).catch((err) => {
  console.log(err)
})