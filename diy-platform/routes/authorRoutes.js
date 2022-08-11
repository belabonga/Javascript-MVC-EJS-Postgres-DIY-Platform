// REQUIRE CONTROLLERS
const Controller = require('../app/controllers/controller');
const express = require('express');
const route = express.Router()


// ENDPOINT & HANDLER
// GET
route.get('/', Controller.authorsData)
route.get('/detail', Controller.authorsDetail)

module.exports = route