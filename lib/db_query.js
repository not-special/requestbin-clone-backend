const { dbQuery } = require("./db_conn");

async function createBin(path) {
  const utcDate = new Date().toUTCString();
  const query = `INSERT INTO bins
    (path, created_at)
    VALUES ('${path}', '${utcDate}') RETURNING *;
  `

  let result = await dbQuery(query);
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
  const utcDate = new Date().toUTCString();
  const query = `
    INSERT INTO requests (bin_id, http_method, content_type_header, content_length_header, headers, payload, created_at)
    VALUES (${data.binId}, '${data.method}', '${data.contentType}', '${data.contentLength}', '${data.headers || '{}'}', '${data.payload || '{}'}', '${utcDate}')
    RETURNING *
  `
  let result = await dbQuery(query)
  return result
}

async function getBinRequestsByPath(path) {
  const query = `
    SELECT r.id, r.http_method, r.content_type_header, r.content_length_header, r.headers, r.payload
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