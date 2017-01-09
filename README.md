Black Ocean Data API Overview

This document is intended for developers who want to write applications that interact with Black Ocean. It explains basic concepts of the API itself. It also provides an overview of the different functions that the API supports.

# setup
start mysql server 
  - mysql.server start

load schemas
  - mysql -u root -p < ./db/schema.sql

Initial data
  - <TODO: Create dummy data for chefs/users and load >

  Required
    cuisines
      - French
      - Italian
      - American
      - Spanish
      - Mexican
      - Korean
      - Chinese
      - Japanese

    locations
      - San Francisco
      - Los Angeles
      - Chicago
      - New York City

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
