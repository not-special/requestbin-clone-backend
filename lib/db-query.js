const { dbQuery } = require("./db-conn");

async function createBin(url) {
  const utcDate = new Date().toUTCString();
  const CREATE_BIN = "INSERT INTO bins" +
  "  (path, created_at)" +
  "  VALUES ($1, $2) RETURNING *";

  let result = await dbQuery(CREATE_BIN, url, utcDate);
  return result
}

module.exports = { createBin }