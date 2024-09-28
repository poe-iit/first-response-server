const pubsub = require("../../../helpers/pubsub")

// Define a function that returns an async iterator for the "SEND_HELLO" event
// This allows clients to subscribe to the "SEND_HELLO" event and receive messages when this event is published
const sendHello = () => pubsub.asyncIterator("SEND_HELLO")

// Export the 'sendHello' function for use in GraphQL resolvers or other parts of the application
module.exports = {
  sendHello
}