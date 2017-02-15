# ChefPlease API Overview

This document is intended for developers who want to write applications that interact with ChefPlease. It explains basic concepts of the API itself. It also provides an overview of the different functionality that the API supports.

## Table of Contents

1. [Setup](#Setup)
1. [Description](#Description)
1. [Route Specs](#Route Specs)

## Requirements

- Node (v6.3.1)

## Setup
After cloning and installing library modules (via npm install), a local instance of the server may be started by running 'npm start' in terminal. This step is optional due to server code being deployed at https://git.heroku.com/desolate-retreat-83779.git.  If continuing development with a local server, database schema may be loaded by running mysql -u root -p < ./db/schema.sql in terminal.  Be sure to have mysql running as a prerequisite (via mysql.server start). 

## Description
The server mediates CRUD requests from the client for the following routes.

Primary tables:
/signup (POST)
/login  (POST)
/logout (GET)
/users  (GET, PUT)
/chefs  (GET, POST, PUT)
/dishes (GET, POST)
/events (GET, POST)

Currently the supported locations, cuisines, and restrictions are as follows:
locations ***
  - San Francisco, CA, USA
  - Los Angeles, CA, USA
  - Chicago, IL, USA
  - New York City, NY, USA

cuisines
  - French
  - Italian
  - American
  - Spanish
  - Mexican
  - Korean
  - Chinese
  - Japanese

restrictions
  - Eggs
  - Dairy
  - Peanuts
  - Tree nuts
  - Seafood
  - Shellfish
  - Wheat
  - Soy
  - Gluten

*** When posting or updating a location for an event or chef, if the location is not included in the database, it will be added to the locations table as a new entry in the locations table

## Route Specs
|  Endpoint URL |      Verb     | Request Body | Response Body | Description |
| ------------- | ------------- | ------------ | ------------- | ----------- |
| /signup  | `POST`  | {name, bio, email, password} | {AuthToken} | Signs up new user to the Database, Response will include an auth token and the the new user's userID in res.body|
| /login   | `POST`  | {email, password} | {AuthToken} | Login an existing user, if login is successful (matching email and password), a session will be created and an auth token will be returned in res.body.  Once a user is logged in, subsequent requests will include the JWT allowing the user access to other routes |
| /logout  | `GET`   | N/A (send JWT in req.headers | 'user token has been deleted!' | Logs user out from their current session |
| /users/:id | `GET` | N/A | {userData} | Respond with JSON of single user with matching id |
| /users/:id | `PUT` | {name, bio, image} | 200 (on success) |  Update a specific user's information |
| /chefs/?cuisine=<string>&location=<string>&restrictions=<string1>&restrictions=<string2>&restrictions=... | `GET` | N/A | {chefData} | Search query route for chefs with matching cuisine, location and restriction(s) |
| /chefs/userId/:id | `GET` | N/A | {chefData} | Respond with chef data matching on the chef's userID |
| /chefs | `POST` | N/A | {name, bio, image, userID, locations: <array>, cuisines: <array> restrictions: <array>} | id of new chef | Add the new chef to database |
| /chefs/:id | `PUT` | {name, bio, image, locations: <array>, cuisines: <array>, restrictions: <array>} | 200 (on success) | Update a specific chef's information in database |
| /dishes/chefs/:id | `GET` | N/A | {data: [dishData]} | For a specific chef, respond with all the dishes they serve |
| /dishes/chefs/:id | `POST` | {name, text, image, cuisines: <array>, restrictions: <array>} | Create a new dish for a specified chef |
| /events | `GET` | N/A | {data: [eventData]} | Get all events in database (dev testing purposes) |
| /events | `POST` | {name, time: <datetime>, location, text, chefId, userId, quantity: {<dishId>:<integer>}} | {eventId} | create an event for a user and chef |
| /events/:id/dishes | `GET` | N/A | {data: [dishData]} | Get all dishes (with their quantities) for a specified event matching on id |
| /events/users/:id?chefId | `GET` | N/A | {data: [eventData]} | Get all events for a user, if chefId is also provided, then a concatenated event array with both user and chef events will be returned |
| /events/chefs/:id | `GET` | {data: [eventData]} | Get all events for a chef with matching id |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.