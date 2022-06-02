const Router = require('express')
const router = new Router()
const randomstring = require("randomstring");
const middleware = require('../utils/middleware')
const { getBinByPath, createRequest, getBinRequestsByPath } = require("../lib/db-query")

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

router.get('/api/bins/:path', middleware.parseRequest, async (req, res) => {
  const path = req.params.path
  const inspect = req.query.inspect
  let result
  
  if (inspect === undefined) {
    console.log('record GET request')
    const requestData = res.locals.requestData
    requestData.binId = await getBinId(requestData.binPath)
    await saveRequest(requestData)
    res.status(201).send(requestData.binPath)
  } else {
    try {
      result = await getBinRequestsByPath(path)
    } catch (error) {
      console.log(error)
    }
    res.status(200).send(result.rows)
  }
})

module.exports = router;
