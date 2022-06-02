const Router = require('express')
const router = new Router()
const randomstring = require("randomstring");
// const db = require("../lib/db-conn")
const { createBin } = require("../lib/db-query")


router.post('/api/bins', async (req, res) => {
  const path = randomstring.generate(7)
  //createbin at DB, if success, send response of object w { "path":"binURL" }
  let binPath
  try {
    binPath = await createBin(path)
  } catch (error) {
    console.log(error)
  }
  
  res.status(200).send(binPath.rows[0].path)
})

module.exports = router;
