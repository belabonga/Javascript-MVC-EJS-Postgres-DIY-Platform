// REQUIRE CONTROLLERS
const Controller = require('../app/controllers/controller');
const express = require('express');
const route = express.Router();


// ENDPOINT & HANDLER
// GET
// MAIN ROUTE : /posts
route.get('/', Controller.postsData)
route.get('/add', Controller.newPost)
route.post('/add', Controller.addPost)
route.get('/:id', Controller.postDetail)
route.get('/:id/edit', Controller.editPage)
route.post('/:id/edit', Controller.editPost)
route.get('/:id/delete', Controller.deletePost)
route.get('/:id/vote', Controller.vote)
route.get('/search', Controller.searchPost) 

module.exports = route