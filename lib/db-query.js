const { dbQuery } = require("./db-conn");

async function createBin(url) {
  const utcDate = new Date().toUTCString();
  const CREATE_BIN = "INSERT INTO bins" +
  "  (path, created_at)" +
  "  VALUES ($1, $2) RETURNING *";

  let result = await dbQuery(CREATE_BIN, url, utcDate);
  return result
}

async function getBinByPath(path) {
  const query = `
    SELECT * 
    FROM bins b
    WHERE b.path = '${path}'
  `
  let result = await dbQuery(query)
  return result
}

async function createRequest(data) {
  const query = `
    INSERT INTO requests (bin_id, http_method, content_type_header, content_length_header, headers, payload)
    VALUES (${data.binId}, '${data.method}', '${data.contentType}', '${data.contentLength}', '${data.headers || '{}'}', '${data.payload || '{}'}')
  `
  let result = await dbQuery(query)
  return result
}

async function getBinRequestsByPath(path) {
  const query = `
    SELECT * 
    FROM bins b
    JOIN requests r ON r.bin_id = b.id
    WHERE b.path = '${path}'
  `
  let result = await dbQuery(query)
  return result
}

module.exports = { 
  createBin,
  getBinByPath,
  createRequest,
  getBinRequestsByPath
}