const pool = require('./connection');
const fs = require('fs');

// DATA AUTHORS
const dataAuthors = JSON.parse(fs.readFileSync("data/authors.json", "utf-8"))
const vAuth = dataAuthors.map(el => {return `('${el.fullName}', '${el.gender}')`})

const query = `
    INSERT INTO "Authors" ("fullName", gender)
    VALUES ${vAuth.join(",\n")};`

    
// DATA POSTS
const dataPosts = JSON.parse(fs.readFileSync("data/posts.json", "utf-8"))
const vPosts = dataPosts.map(el => {return `('${el.title}', '${el.difficulty}', ${el.estimatedTime}, '${el.description}', ${el.totalVote}, '${el.imageUrl}', '${el.createdDate}', ${el.AuthorId})`})

const query2 = `
    INSERT INTO "Posts" (title, difficulty, "estimatedTime", description, "totalVote", "imageUrl", "createdDate", "AuthorId")
    VALUES ${vPosts.join(",\n")};
    `

// INSERT AUTHORS VALUE
pool.query(query, (err, res) => {
    if (err) console.log("ERROR : FAILED TO INSERT AUTHORS DATA")
    else { console.log(res)

        // INSERT POSTS VALUE
        pool.query(query2, (err, res) => {
            if (err) console.log("ERROR : FAILED TO INSERT POSTS DATA")
            else console.log(res)
        })
    }
})