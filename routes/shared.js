const { getBinByPath, createRequest } = require("../lib/db_query")

const getBinId = async (path) => {
  try {
    const result = await getBinByPath(path)
    return result.rows[0].id
  } catch (error) {
    console.log(error)
  }
} 

const saveRequest = async (requestData) => {
  try {
    createRequest(requestData)
  } catch (error) {
    console.log(error)
  }
}

const binJSON = (binData, requests) => {
  obj = {}
  obj.binId = binData.binId
  obj.path = binData.binPath
  obj.requests = requests
  return obj 
}

module.exports = {
  saveRequest,
  getBinId,
  binJSON,
}
