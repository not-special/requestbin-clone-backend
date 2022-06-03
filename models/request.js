const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const requestSchema = new mongoose.Schema({
    requestId: Number,
    binId: Number,
    payload: Object,
  })

module.exports = mongoose.model('Request', requestSchema)
