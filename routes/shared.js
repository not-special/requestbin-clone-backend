const { getBinByPath, createRequest } = require("../lib/db_query")
const mongo = require("../lib/mongo_query")

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
    const result = await createRequest(requestData)
    return result.rows[0]
  } catch (error) {
    console.log(error)
  }
}

const savePayload = (id, binId, payload) => {
  mongo.savePayload(id, binId, payload)
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
  savePayload,
  binJSON,
}
