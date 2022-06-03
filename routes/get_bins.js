const Router = require('express')
const router = new Router()
const middleware = require('../utils/middleware')
const { getBinRequestsByPath } = require("../lib/db_query")
const { getBinId, saveRequest, binJSON } = require("./shared")
const { getPayload } = require("../lib/mongo_query")


router.get('/api/bins/:path', middleware.parseRequest, async (req, res) => {
  const path = req.params.path
  const inspect = req.query.inspect
  let result
  const requestData = res.locals.requestData
  requestData.binId = await getBinId(requestData.binPath)
  
  if (inspect === undefined) {
    const result = await saveRequest(requestData)
    await savePayload(result.id, requestData.binId, requestData.payload)
    res.status(201).json({"path": requestData.binPath})
  } else {
    try {
      result = await getBinRequestsByPath(path)
    } catch (error) {
      console.log(error)
    }
    //Get payload data from MongoDB
    // merge request data from Postgres w payload from Mongo
    let payload = await getPayload(requestData.binId)
    console.log("in get_bins", payload)
    idToPayload = {}
    payload.forEach(p => idToPayload[p.requestId] = p.payload)
    result.rows.forEach(row => {
      row.payload = idToPayload[String(row.id)]
    })
    
    res.status(200).json(binJSON(requestData, result.rows))
  }
})

module.exports = router;
