require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER_NAME,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.PG_PW,
  port: 5432,
})

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

module.exports = {
  dbQuery(statement, ...parameters) {
    logQuery(statement, parameters);
    return pool.query(statement, parameters)
      .then(res => res)
      .catch(err => console.error('Error executing query', err.stack))
  }
};
