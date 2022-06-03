const Router = require('express')
const router = new Router()
const middleware = require('../utils/middleware')
const { getBinRequestsByPath } = require("../lib/db_query")
const { getBinId, saveRequest, binJSON } = require("./shared")
const { getPayload } = require("../lib/mongo_conn")


router.get('/api/bins/:path', middleware.parseRequest, async (req, res) => {
  const path = req.params.path
  const inspect = req.query.inspect
  let result
  const requestData = res.locals.requestData
  requestData.binId = await getBinId(requestData.binPath)
  
  if (inspect === undefined) {
    await saveRequest(requestData)
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
    
    res.status(200).json(binJSON(requestData, result.rows))
  }
})

module.exports = router;
