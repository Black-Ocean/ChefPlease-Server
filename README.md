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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.