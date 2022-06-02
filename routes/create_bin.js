const Router = require('express')
const router = new Router()
const randomstring = require("randomstring");
const { createBin } = require("../lib/db_query")


router.post('/api/bins', async (req, res) => {
  const path = randomstring.generate(7)
  let binPath
  try {
    binPath = await createBin(path)
  } catch (error) {
    console.log(error)
  }
  
  res.status(200).json({"path":binPath.rows[0].path})
})

module.exports = router;
