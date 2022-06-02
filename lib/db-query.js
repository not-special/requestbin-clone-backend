require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER_NAME,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.PG_PW,
  port: 5432,
})

const createBin = (path) => {
  return new Promise((resolve, reject) => {
    let query = `
      INSERT INTO bins (path) VALUES ('${path}') RETURNING *
    `
    pool.query(query, (error, results) => {
      if (error) {
        return reject(error)
      }
      return resolve(results)
    })
  })
}

module.exports = {
  createBin
}
