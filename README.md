# Setup

## Clone repository
```bash
git clone git@github.com:IPRO-POE/first-response-server.git
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
