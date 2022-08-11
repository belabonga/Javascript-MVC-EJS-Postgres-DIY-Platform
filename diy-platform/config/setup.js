const pool = require('./connection');

// CAUTION - THIS ACTION WILL DELETE ALL TABLES
// UNCOMMENT IF NEEDED
const delAuthors = `DROP TABLE IF EXISTS "Authors"`
const delPosts = `DROP TABLE IF EXISTS "Posts"`

const qAuthors = `CREATE TABLE IF NOT EXISTS "Authors" (
    "id" SERIAL PRIMARY KEY,
    "fullName" VARCHAR (120) NOT NULL,
    "gender" VARCHAR (6) NOT NULL
)`

const qPosts = `CREATE TABLE IF NOT EXISTS "Posts" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(100),
    "difficulty" VARCHAR(6),
    "estimatedTime" INTEGER,
    "description" TEXT,
    "totalVote" INTEGER,
    "imageUrl" VARCHAR(100),
    "createdDate" DATE,
    "AuthorId" INTEGER,
    FOREIGN KEY("AuthorId")
    REFERENCES "Authors"(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
)`

// CATEGORIES

// DELETE POSTS TABLE
pool.query(delPosts, (err, res) => {
    if (err) console.log("ERROR : FAILED TO DELETE POSTS TABLE")
    else { console.log("SUCCEED DELETE POSTS TABLE")

        // DELETE AUTHORS TABLE
        pool.query(delAuthors, (err, res) => {
            if (err) console.log("ERROR : FAILED TO DELETE AUTHORS TABLE")
            else { console.log("SUCCEED DELETE AUTHORS TABLE")
                
                // CREATE AUTHORS TABLE
                pool.query(qAuthors, (err, res) => {
                    if(err) console.log("ERROR : FAILED TO CREATE AUTHORS TABLE")
                    else { console.log("SUCCEED CREATE AUTHORS TABLE")

                        // CREATE POSTS TABLE
                        pool.query(qPosts, (err, res) => {
                            if(err) console.log("ERROR : FAILED TO CREATE POSTS TABLE")
                            else { console.log("SUCCEED CREATE POSTS TABLE")

                            }
                        })
                    }
                })
            }
        })
    }
})