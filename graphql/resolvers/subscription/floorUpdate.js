const pubsub = require("../../../helpers/pubsub")
const { withFilter } = require("../../../helpers/withFilter")
const { withAuthorisation } = require("../../../helpers/withAuthorisation")

// Define a filtered subscription for floor updates using 'withFilter'
// 'withFilter' takes two arguments:
// 1. A function that returns an async iterator for the subscription topic (in this case, "FLOOR_UPDATE")
// 2. A function that acts as a filter to decide whether the event should be passed to the subscriber
const floorUpdate = withAuthorisation(
  withFilter(
    () => pubsub.asyncIterator("FLOOR_UPDATE"),
    async (payload, variables) => {
      const floorUpdate = await payload.floorUpdate
      return floorUpdate?.id === variables?.id
    }
  ), 
  ["user", "admin"]
)

// Export the filtered subscription for use in GraphQL resolvers
module.exports = {
  floorUpdate
}