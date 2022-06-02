const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

app.get('/api/test', (req, res) => {
  res.send('Success')
})

app.post('/api/bins', require('./routes/bins'))
app.get('/api/bins/:path', require('./routes/get_bins'))
app.all('/api/bins/:path', require('./routes/all_bins'))

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
