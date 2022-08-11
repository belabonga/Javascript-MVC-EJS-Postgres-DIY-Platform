const { Pool } = require('pg')

const pool = new Pool ({
  user: "postgres",
  host: "localhost",
  database: 'DIYPlatform',
  password: "postgres",
  port: 5433,
  idleTimeoutMillis: 500
})

// UNCOMMENT WHEN NEEDED
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   // pool.end()
// })

module.exports = pool