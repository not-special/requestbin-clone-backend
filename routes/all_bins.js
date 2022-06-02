const Router = require('express')
const router = new Router()
const middleware = require('../utils/middleware')
const { getBinId, saveRequest, savePayload } = require("./shared")

router.all('/api/bins/:path', middleware.parseRequest, async (req, res) => {
  const requestData = res.locals.requestData
  console.log('requestDATA', requestData)
  requestData.binId = await getBinId(requestData.binPath)
  await saveRequest(requestData)
  savePayload(requestData.id, requestData.binId, requestData.payload)
  res.status(201).send(requestData.binPath)
})

module.exports = router;
