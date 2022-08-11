const express = require('express');
const route = express.Router();
const routeAuthor = require('./authorRoutes');
const routePost = require('./postsRoutes');


route.get('/', (req, res) => {
    res.render("home");
});

route.use("/posts", routePost);
route.use("/authors", routeAuthor)

module.exports = route;