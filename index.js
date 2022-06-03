const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const middleware = require('./utils/middleware')
const PORT = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use(express.static('build'))

app.get('/api/test', (req, res) => {
  res.send('Success')
})

app.post('/api/bins', require('./routes/create_bin'))
app.get('/api/bins/:path', require('./routes/get_bins'))
app.all('/api/bins/:path', require('./routes/all_bins'))

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
