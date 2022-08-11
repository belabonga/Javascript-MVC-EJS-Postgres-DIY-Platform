const pool = require("../../config/connection");
const Model = require("../models/model");

class Controller {

    // HOME - AUTHORS & POSTS BUTTON
    static home(req, res){
        Model.home((err, data) => {
            err ? res.render('errorPage') : res.render('main');
        }) 
    }

    // SHOW POSTS LIST
    static postsData(req, res){
        Model.postsData((err, data) => {
            err ? res.render('errorPage') : res.render('posts', {data : data});
        }) 
    }

    // SHOW ONE POST
    static postDetail(req, res){
        const {id} = req.params
        Model.postDetail(+id, (err, data) => {
            err ? res.render('errorPage') : res.render('postDetail', {data : data});
        }) 
    }

    // READ AUTHORS DATA
    static authorsData(req, res){
        Model.authorsData((err, data) => {
            err ? res.render('errorPage') : res.render('authors', {data : data});
        }) 
    }

    // SHOW AUTHORS DETAIL
    static authorsDetail(req, res){
        Model.authorsDetail((err, data) => {
            err ? res.render('errorPage') : res.render('authorsDetail', {data : data});
        }) 
    }

    // REDIRECT NEW POST PAGE
    // GET
    static newPost(req, res){
        // req query = ?err=
        let errors = req.query
        Model.authorsData((err, data) => {
            err ? res.render('errorPage') : res.render('newPost', {data : data, errors : errors});
            // console.log(errors); { err: 'Image Url is required,Date is required,Author is required,Minimum estimated time is 5 minute'}
        }) 
    }
    
    // NEW POST - ADD THE VALUE
    // POST
    static addPost(req, res){
        const {title, author, difficulty, estimatedTime, imageUrl, description, createdDate} = req.body;
        Model.addPost(title, +author, difficulty, estimatedTime, imageUrl, description, createdDate, (err, data) => {
            err ? res.redirect(`/posts/add?err=${err}`) : res.redirect("/posts");
        }) 
    }

    // ADD VOTE
    static vote(req, res){
        let id = +req.params.id
        Model.vote(id, (err, data) => {
            err ? res.render('errorPage') :  res.redirect(`/posts/${id}`);
        }) 
    }

    // EDIT POST - GET THE VALUE
    static editPage(req, res){
        let id = req.params.id
        let result = {}
        Model.findOnePost(id, (err, data) => {
            if (err) res.render('errorPage')
            else {
                result.post = data[0] //
                Model.authorsData((err, data) => {
                    if (err) res.render('errorPage')
                    else {
                        result.authors = data
                        res.render('editPost', result)
                    }
                })
            }

        })
    }

    // EDIT POST - GET THE VALUE
    static editPost(req, res){
        Model.editPost(req.params.id, req.body, (err, data) => {
            err ? res.render('errorPage') : res.redirect("/posts");
        }) 
    }

    // DELETE POST
    static deletePost(req, res){
        Model.deletePost(req.params.id, (err, data) => {
            err ? res.render('errorPage') : res.redirect("/posts");
        }) 
    }

    // SEARCH POST(S)
    static searchPost(value, cb){
        Model.searchPost(req.body, (err, data) => {
            err ? res.render('errorPage') : res.redirect("/posts")
        })
    }

}

module.exports = Controller