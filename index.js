const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

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

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("MongoDB connected")
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server started on http://localhost:" + (process.env.PORT || 5000))
  })
}).catch((err) => {
  console.log(err)
})
