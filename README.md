# Wayfarer_Api
a public bus transportation booking server

[![Build Status](https://travis-ci.org/mastjoe/WayFarer_Api.svg?branch=develop)](https://travis-ci.org/mastjoe/WayFarer_Api)    [![Coverage Status](https://coveralls.io/repos/github/mastjoe/WayFarer_Api/badge.svg?branch=develop)](https://coveralls.io/github/mastjoe/WayFarer_Api?branch=master)

##Description
This is a bus booking API server built Node Js for a typical road transport system. It has endpoints that enable users to sign up, sign in, book bus ticket and pick seat of their choice within available seats.

## Getting Started

To get this server running locally,
  * clone repo to local machine
  * run ```npm install``` to install all required dependencies. (Ensure you have node package manager NPM and Node installed on your machine).
  * Install any good API testing application like Postman.
  * Install and setup a Postgres database and edit .env file to database connection parameters like, **PGHOST**, **PGUSER**, **PGDATABASE**, **PGPASSWORD**, **PGPORT** to postgres host, username, database name, password and port respectively.
  * ```npm migrate``` to run migration for table creation.
  * ```npm run seeder``` to run the pre-insert / seed superadmin details into database.
  * ```npm run start``` to start up the server application.

  ## Dependencies
  * [**Express js**](https://github.com/expressjs/express) - Handling HTTP routing and middlewares.
  * [**jsonwebtoken**](https://github.com/auth0/node-jsonwebtoken) - Handling of users authentication via *JWT*.
  * [**Joi**](https://github.com/hapijs/joi) - Validating endpoint request parameters.
  * [**pg**](https://github.com/brianc/node-postgres) - Node - Postgres database interactions.

  ## Authentication
  Request are validated with JWT technique. it is important to obtain a JWT by signing in and subsequently placing the obtained *token* into the Authorization field of header (a single space after *Bearer*).

  ## EndPoints
  See documentation of end points [**here**](https://wayfarer-api-2019.herokuapp.com/docs/).