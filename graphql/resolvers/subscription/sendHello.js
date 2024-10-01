const pubsub = require("../../../utils/pubsub")
const { withAuthorisation } = require("../../../utils/withAuthorisation")

// Define a function that returns an async iterator for the "SEND_HELLO" event
// This allows clients to subscribe to the "SEND_HELLO" event and receive messages when this event is published
const sendHello = withAuthorisation(
  () => pubsub.asyncIterator("SEND_HELLO"),
  ["user", "admin"]
)

// Export the 'sendHello' function for use in GraphQL resolvers or other parts of the application
module.exports = {
  sendHello
}