const server = require('../server.js');
const helpers = require('./routes/v1/helpers');

const supertest = require('supertest');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const connection = require('./db/index.js');

initialize(path.join(__dirname, '/testdata'));

describe ('server', function() {
  describe('auth routes', function() {
    it('should post to users on /signup', function(done) {

    });
  });

  describe('user routes', function() {

  });

  describe('chef routes', function() {

  });

  describe('dish routes', function() {

  });

  describe('event routes', function() {

  });
});