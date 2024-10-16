
// Import the Express Router to create modular route handlers
const router = require("express").Router()

// Import pubsub helper for publishing events
const pubsub = require("../utils/pubsub")

// Import the Floor resolver to handle fetching floor data
const Floor = require("../graphql/resolvers/floor")

// Route to send a 'hello' message using pubsub
router.get("/send_hello", (_, res) => {
  // Publish a "SEND_HELLO" event with a custom message
  pubsub.publish("SEND_HELLO", {
    sendHello: {
      message: "Hi Hi Hi Hi!!"
    }
  })
  // Respond with a JSON message confirming success
  res.status(200).json({
    message: "Hello World!"
  })
})

// Route to handle floor update requests
router.get("/floor", (req, res) => {
  // Publish a "FLOOR_UPDATE" event with data for a specific floor
  pubsub.publish("FLOOR_UPDATE", {
    floorUpdate: Floor.build("660e5641660cb8aa1184bf24", {
      isAuth: true
    })
  })
  // Respond with a JSON message confirming success
  res.status(200).json({
    message: "Hello World!"
  })
})

module.exports = router