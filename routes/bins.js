const Router = require('express')
const router = new Router()
const randomstring = require("randomstring");


router.post('/api/bins', (req, res) => {
  const path = randomstring.generate(7)
  //createbin at DB, if success, send response of object w { "path":"binURL" }
  
  res.send(path)
})

module.exports = router;