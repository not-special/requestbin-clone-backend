const Router = require('express')
const router = new Router()
const middleware = require('../utils/middleware')
const { getBinId, saveRequest, savePayload } = require("./shared")

router.all('/api/bins/:path', middleware.parseRequest, async (req, res) => {
  const requestData = res.locals.requestData
  requestData.binId = await getBinId(requestData.binPath)
  const result = await saveRequest(requestData)
  await savePayload(result.id, requestData.binId, requestData.payload)
  res.status(201).json({"path": requestData.binPath})
})

module.exports = router;
