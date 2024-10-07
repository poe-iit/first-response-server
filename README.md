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

# Middleware Folder

This folder contains middleware functions used throughout the project to handle authentication and rate limiting. Below is a breakdown of each file and its purpose.

## Files:

### 1. `authenticate.js`

This file defines a middleware function for authenticating incoming requests by leveraging the authParse utility function.

- **Functionality**:
  - Relies on the `authParse.js` file from the `utils` folder to extract and validate JWT tokens from the request headers or cookies.
  - After token validation, it proceeds with the next middleware or route handler.
  - For more details on how token parsing and validation works, refer to the `authParse.js` section of the `README`.

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

## Usage

These utilities are essential for handling authentication, authorization, and subscription filtering within the project. They can be imported and used in other parts of the application as needed.
