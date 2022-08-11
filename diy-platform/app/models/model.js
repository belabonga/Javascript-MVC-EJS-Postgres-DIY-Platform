const pool = require("../../config/connection");
const { Author, AuthorDetail, Post, PostDetail } = require('./class');

class Model {
    // SHOW POSTS DATA
    // route : /posts
    static postsData(cb){
        const query = `SELECT * FROM "Posts";`
        
        pool.query(query, (err, res) => {
            if (err) {
                console.log("ERROR : FAILED TO SHOW POSTS DATA")
                cb(err)
            } else {
                console.log("STATUS : SUCCEED DISPLAY POSTS DATA")
                const data = res.rows.map(el => new Post(el.id, el.title, el.difficulty, el.totalVote))
                cb(null, data)
            }
        })
    }

    // SHOW POSTS DATA PER ID
    // route : /posts/:id
    static postDetail(id, cb){
        Model.authorsData((err, author) => {
            if (err) cb(err)
            else {
                const query = `
                                SELECT      p.*,
                                            a."fullName"
                                FROM        "Authors" a
                                INNER JOIN "Posts" p 
                                    ON      a.id = p."AuthorId"
                                WHERE       p.id = ${id}
                                ORDER BY    a.id;
                                ` // query end
                
                pool.query(query, (err, res) => {
                    if (err) {
                        console.log("ERROR : FAILED TO SHOW POSTS DETAIL DATA")
                        cb(err)
                    } else {
                        console.log("STATUS : SUCCEED DISPLAY POSTS DETAIL DATA")
                        const data = res.rows.map(el => new PostDetail(el.id, el.title, el.difficulty, el.estimatedTime, el.description, el.totalVote, el.imageUrl, el.createdDate, el.AuthorId, el.fullName))
                        cb(null, data[0], author)
                    }
                })
            }
        })
    }

    // SHOW AUTHORS DATA
    // Route : /authors
    static authorsData(cb){
        const query = `SELECT * FROM "Authors";`
        
        pool.query(query, (err, res) => {
            if (err) {
                console.log("ERROR : FAILED TO SHOW AUTHORS DATA")
                cb(err)
            } else {
                console.log("STATUS : SUCCEED DISPLAY AUTHORS DATA")
                const data = res.rows.map(el => new Author(el.id, el.fullName, el.gender))
                cb(null, data)
            }
        })
    }

    // SHOW AUTHORS DETAIL DATA
    // Route : /authors/detail
    static authorsDetail(cb){
        const query = `
                        SELECT          a.id,
                                        a."fullName",
                        COUNT           (p."AuthorId") AS "totalPost",
                        SUM             (p."totalVote") AS "totalVote",
                        ROUND           (AVG(p."estimatedTime")) AS "averageTime"
                        FROM            "Authors" a
                        FULL OUTER JOIN "Posts" p 
                        ON              p."AuthorId" = a.id
                        GROUP BY        a.id
                        ORDER BY        a.id
                    ` // query end
        
        pool.query(query, (err, res) => {
            if (err) {
                console.log("ERROR : FAILED TO SHOW AUTHORS DETAIL DATA")
                cb(err)
            } else {
                console.log("STATUS : SUCCEED DISPLAY AUTHORS DETAIL DATA")
                const data = res.rows.map(el => new AuthorDetail(el.id, el.fullName, el.gender, el.totalPost, el.totalVote, el.averageTime))
                cb(null, data)
            }
        })
    }

    // ADD NEW POST
    // route : POST /posts/add
    static addPost(title, author, difficulty, estimatedTime, imageUrl, description, createdDate, cb){

        let errors = []
        // URL Validation
        if (!imageUrl) {
            errors.push("Image Url is required")
            console.log("ERROR :  IMAGE URL IS REQUIRED");
        } else if (imageUrl.length > 100) {
            errors.push("Image Url name maximum character is 100")
            console.log("ERROR : IMAGE URL MAXIMUM CHARACTER IS 100");
        }

        // DATE Validation
        const today = new Date().toISOString().slice(0, 10);
        if (!createdDate) {
            errors.push("Date is required")
            console.log("ERROR : DATE IS REQUIRED");
        } else if (new Date(createdDate) > today) {
            errors.push("Maximum created date is today.")
            console.log("ERROR : DATE MAX IS TODAY DATE");
        }

        // TITLE VALIDATION
        if (!title || title.length == 0) {
            errors.push("Name is required")
            console.log("ERROR : NAME IS REQUIRED");
        }

        // AUTHOR VALIDATION
        if (!author || author == 0) {
            errors.push("Author is required")
            console.log("ERROR : AUTHOR IS REQUIRED");
        }

        // DIFFICULTY VALIDATION
        if (!difficulty || difficulty == 0) {
            errors.push("Difficulty is required")
            console.log("ERROR : DIFFICULTY IS REQUIRED");
        }

        // ESTIMATED TIME VALIDATION
        if (!estimatedTime || estimatedTime < 5) {
            errors.push("Minimum estimated time is 5 minute")
            console.log("ERROR : MINIMUM ESTIMATED TIME IS 5 MINUTES");
        }

        // DESCRIPTION VALIDATION
        if (!description || description.length < 10) {
            errors.push("Minimum word in description is 10 characters.")
            console.log("ERROR : MINIMUM WORD IS 10 CHARACTERS");
        }
        

        // ERROR CONDITIONAL
        if (errors.length > 0) {
            console.log("ERROR : INCOMPLETE/INCORRECT INPUT DATA")
            cb(errors)
        } else {
            // ADDING POST
            const query = `INSERT INTO "Posts" (
                                                "title",
                                                "AuthorId",
                                                "difficulty",
                                                "estimatedTime",
                                                "imageUrl",
                                                "description",
                                                "createdDate",
                                                "totalVote")
                            VALUES (
                                                '${title}',
                                                '${+author}',
                                                '${difficulty}',
                                                '${estimatedTime}',
                                                '${imageUrl}',
                                                '${description}',
                                                '${createdDate}',
                                                0)
                            ` //query end
            
            pool.query(query, (err,data) => {
                if (err) {
                    console.log(err);
                    // console.log("ERROR : FAILED CREATE NEW POST");
                    cb(err)
                } else {
                    console.log("STATUS : SUCCEED CREATE NEW POST");
                    cb(null, data)
                }
            })
        }     
    }

    // FIND ONE POST BY ID
    static findOnePost(id, cb){
        const query = `SELECT * FROM "Posts" WHERE "id" = ${id};`
        
        pool.query(query, (err, res) => {
            if (err) {
                console.log("ERROR : FAILED TO SHOW POSTS DATA")
                cb(err)
            } else {
                console.log("STATUS : SUCCEED DISPLAY POSTS DATA")
                const data = res.rows.map(el => new PostDetail(el.id, el.title, el.difficulty, el.estimatedTime, el.description, el.totalVote,  el.imageUrl, el.createdDate, el.AuthorId))
                cb(null, data)
            }
        })
    }

    // EDIT POST
    // /posts/:id/edit
    static editPost(id, data, cb){
        const query = `UPDATE   "Posts" 
                        SET     "title"         = '${data.title}',
                                "AuthorId"      = ${+data.author},
                                "difficulty"    = '${data.difficulty}',
                                "estimatedTime" = ${+data.estimatedTime},
                                "imageUrl"      = '${data.imageUrl}',
                                "description"   = '${data.description}',
                                "createdDate"   = '${data.createdDate}'
                        WHERE   "id"            = ${id}`
            
        pool.query(query, (err, res) => {
                if (err) {
                    console.log("ERROR : FAILED TO UPDATE POSTS");
                    cb(err)
                }
                else {
                    console.log("STATUS : SUCCEED UPDATE WITH ID" + id);
                    cb(null, res)   
                }
        })
    }

    // DELETE POST
    static deletePost(id, cb){
        const query = `DELETE FROM "Posts" WHERE id = ${id}`
            pool.query(query, (err, res) => {
                if (err) {
                    console.log("ERROR : FAILED TO DELETE POSTS");
                    cb(err)
                }
                else {
                    console.log("STATUS : SUCCEED DELETE POSTS WITH ID" + id);
                    cb(null, res)   
                }
        })
    }

    // VOTE POST
    static vote(id, cb){
        const query = `UPDATE "Posts"
                        SET "totalVote" = (
                                            SELECT  "totalVote"
                                            FROM    "Posts"
                                            WHERE   "id" = ${id}) + 1
                        WHERE id=${id};
                        ` // query end
                
        pool.query(query, (err, res) => {
            if (err) {
                console.log("ERROR : FAILED TO ADD VOTE DATA")
                cb(err)
            } else {
                console.log("STATUS : SUCCEED ADD VOTE DATA")
                cb(null, res)
            }           
        })        
    }
    
    // SEARCH BAR - POSTS
    static searchPost(value, cb){
        const query = ` SELECT * FROM "Posts" p
                        WHERE p.title
                        ILIKE '%${value}%'
                        ` // query end
        
        pool.query(query, (err, res) => {
            if (err) {
                console.log("ERROR : FAILED TO PERFORM SEARCH POST");
                cb(err)
            } else {
                const postFound = res.rows.map(el => {
                    return new Post(el.id, el.title, el.difficulty, el.totalVote)
                })
                console.log("STATUS : SUCCEED PERFORM SEARCH POST");
                cb(null, postFound)
            }
        })
    }

}

module.exports = Model