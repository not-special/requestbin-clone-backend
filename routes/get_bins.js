const Router = require('express')
const router = new Router()
const middleware = require('../utils/middleware')
const { getBinRequestsByPath } = require("../lib/db_query")
const { getBinId, saveRequest, binJSON } = require("./shared")


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
    res.status(200).json(binJSON(requestData, result.rows))
  }
})

module.exports = router;
