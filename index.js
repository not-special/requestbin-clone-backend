const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

app.get('/api/test', (req, res) => {
  res.send('Success')
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
