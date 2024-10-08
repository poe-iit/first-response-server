# About
This server handles the backend logic for managing buildings, floors, and user interactions with real-time update. It servers responses and publishes events using GraphQL over *http*, *ws*, *https* and *wss*

# Setup

## Clone repository
```bash
git clone git@github.com:poe-iit/first-response-server.git
```

## Install dependencies
```bash
npm install
```

## Get database connection string
Ask for access to the MongoDB database from Tomiwa and follow this [documentation](https://www.mongodb.com/docs/guides/atlas/connection-string/ "Get Connection String")

## Create a .env file 
### Windows
```bash
type nul > .env
```
### Linux
```bash
touch .env
```

## Add database connection string to the .env file
```
DATABASE_URL=<Connection string you got from mongodb>
```

## Run server
```bash
npm start
```
----------------------------------------------------------------------------------------------------

# graphql Folder

The `graphql` folder defines the functions and schemas necessary for the graphql system to handle the functionality and data between the user and building information. 

## The `graphql` folder contains the following:

### resolvers Folder

The `resolvers` folder contains the files and folders necessary to define the functions and classes of the schemas for the graphql system.

### typeDefs Folder 

The `typeDefs` folder contains the files and folders necessary to define the schemas and its types for the graphql system.

## The `resolvers` folder contains the following folders & files:

### `mutation` Folder

Summary Description (Placeholder):

### `query` Folder

Summary Description (Placeholder):

### `subscription` Folder

Summary Description (Placeholder):

### Files `building.js` through `user.js`

Summary Description (Placeholder):

## The `typeDefs` folder contains the following folders & files:

### `mutation` Folder

The `mutation` folder contains the files that define the shemas for creating or updating a building layout, floor layout, node, or user.

### `query` Folder

The `query` folder contains the files that define the schemas for generating a signature, getting the building or floor information, or loging in a user.

### `subscription` Folder

The `query` folder contains the files that define the schemas for subscribing to a floor and updating it.

### Files `building.js` through `user.js`

These are the files that define the schemas that will be used to provide the functionality for the building layout information and the users.

----------------------------------------------------------------------------------------------------

# Middleware Folder

This folder contains middleware functions used throughout the project to handle authentication and rate limiting. Below is a breakdown of each file and its purpose.

## Files:

### 1. `authenticate.js`

This file defines a middleware function for authenticating incoming requests by leveraging the authParse utility function.

- **Functionality**:
  - Relies on the `authParse.js` file from the `utils` folder to extract and validate JWT tokens from the request headers or cookies.
  - After token validation, it proceeds with the next middleware or route handler.
  - For more details on how token parsing and validation works, refer to the `authParse.js` section of the `README` under the `Utility Folder` section.

### 2. `rateLimiter.js`

This file configures and exports rate-limiting middleware using the `express-rate-limit` package to prevent excessive requests.

- **Functionality**:
  - Limits incoming requests to 100 requests per 5 minutes per IP address.
  - Adds `RateLimit` headers to the response to inform clients of their rate limit status.
  - Helps to prevent abuse or overloading of the server by enforcing request limits.

## Usage
These middleware functions are essential for securing the application by handling token-based authentication and controlling traffic through rate limiting.

# Utility Folder

This folder contains utility functions and middleware used throughout the project. Below is a breakdown of each file and its purpose:

## Files:

### 1. `authparse.js`

This file contains a middleware function to authenticate incoming requests by parsing JWT tokens from either cookies or the Authorization header.

- **Functionality**:
  - Parses the `token` from cookies or the Authorization header.
  - Verifies the token using a secret key from environment variables.
  - Sets the `isAuth` property on the request (`req.isAuth`) based on the validity of the token.
  - If the token is valid, it attaches the user information to the request (`req.user`).

### 2. `pubsub.js`

This file manages the Pub/Sub (publish/subscribe) functionality for GraphQL subscriptions using the `graphql-subscriptions` package.

- **Functionality**:
  - Creates and exports an instance of the `PubSub` class, which allows different parts of the application to subscribe and publish events.

### 3. `withAuthorization.js`

This file defines a utility function for checking user roles before allowing access to certain parts of the application.

- **Functionality**:
  - Takes an asynchronous iterator function (`asyncIteratorFn`) and a list of allowed roles.
  - If the user’s roles match any of the allowed roles, the function continues with the iterator function.
  - If the user is not authorized, it stops further execution by returning an iterator that signals completion.

### 4. `withFilter.js`

This file provides a utility function to filter subscription results for GraphQL based on specific conditions.

- **Functionality**:
  - Takes an asynchronous iterator function (`asyncIteratorFn`) and a filtering function (`filterFn`).
  - Filters results from the iterator based on the filtering logic provided in `filterFn`.
  - If a result passes the filter, it gets returned; otherwise, it waits for the next matching result.
----------------------------------------------------------------------------------------------------

# Models Folder

This folder contains mongoose schemas that define the structure of the data models for the project, below is the breakdown of what each files do.

## Files

###  1. `building.js` 

This file defines the schema for `Bulding` in MongoDB, and represents buildings with different floors. 

- **Functionality**:
  - `name`: A required string that stores the name of the building.
  - `floors`: An array of floor objects, each containing:
  - `id`: A reference to the 'floor' collection, represented by an ObjectId.
  - `name`: A required string that stores the name of the floor.

### 2. `floor.js`

This file defined the schema for `Floor` in MongoDB, representing the floors in a building and their associated nodes and paths. 

- **Functionality**:
  - `name`: A required string that stores the name of the floor.
  - `building`: A reference to the Building collection, represented by an ObjectId.
  - `nodes`: A map object that stores node data, based on the nodeSchema.
  - `paths`: A map object that stores paths between nodes.
  - `image`: Stores information related to the floor's image, including:
    - `name`: Name of the image file.
    - `url`: URL of the image file.
    - `position`: Array of numbers representing the image position.
    - `scale`: A number that sets the image scale, with a default value of 1.

### 3. `log.js`

This file defines the schema for `Log` in MongoDB. It stores log data related to specific nodes within buildings and floors.

- **Functionality**:
  - `building`: A required string that stores the name of the building where the log occurred.
  -  `floor`: A required string that stores the name of the floor where the log occurred.
  -  `node`: A required string that stores the node associated with the log.
  -  `type`: A required string that indicates the type of log (e.g., error, info).
  -  `message`: A required string that stores the log message.

### 4. `user.js`

This file defines the schema for `User` in MongoDB. It represents users in the system, including their roles and associated buildings.

- **Functionality**:
  - `username`: An optional string that stores the user's username.
  - `email`: A required string that stores the user's email address.
  - `password`: A required string that stores the user's password.
  - `roles`: A required array of strings that defines the user's roles (e.g., admin, user).
  - `buildings`: An array of ObjectIds that reference the Building collection, representing the buildings the user is associated with.

### 5. `node.js`
This file defines the schema for `Node` in MongoDB. It represents individual nodes within floors, this schema is used to organize and structure the node data in a MongoDB collection.

- **Functionality**:
  - `name`: An optional string that stores the node's name.
  - `state`: A required string that represents the current state of the node.
  - `isExit`: A required boolean that indicates whether the node is an exit point.
  - `connections`: An array of strings that stores the names of nodes connected to this node.
  - `ui`: An object that stores UI-related data, including:
    - `x`: A required number representing the x-coordinate of the node's position in the UI.
    - `y`: A required number representing the y-coordinate of the node's position in the UI.


## Usage

These utilities are essential for handling authentication, authorization, and subscription filtering within the project. They can be imported and used in other parts of the application as needed.
