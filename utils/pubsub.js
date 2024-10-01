// Import the PubSub class from the 'graphql-subscriptions' package
// This allows for implementing a basic publish/subscribe (pub/sub) system
const { PubSub } = require("graphql-subscriptions")

// Create a new instance of PubSub for use in the application
const pubsub = new PubSub()

// Export the PubSub instance for use across the application
module.exports = pubsub