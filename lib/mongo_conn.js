const mongoose = require('mongoose')
const MONGODB_NAME = 'rb'
const url = `mongodb://127.0.0.1:27017/${MONGODB_NAME}`

mongoose.connect(url, { useNewUrlParser: true })

// const db = mongoose.connection
// db.once('open', _ => {
//   console.log('Database connected:', url)
// })

const requestSchema = new mongoose.Schema({
  id: Number,
  binId: Number,
  payload: Object,
})

const Request = mongoose.model('Request', requestSchema)


savePayload = (id, binId, payload) => {
  // mongoose
  // .connect(url)
  // .then((result) => {
  //   console.log('Mongo connected')
  //   console.log('Payload', payload)

    const request = new Request({
      id: id,
      binId: binId,
      payload: payload,
    })

    request.save().then(() => {
      console.log('request saved!')
      mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

getPayload = (binId) => {
  Request.find({}).then(result => {
    result.forEach(request => {
      console.log("getPayload", request)
    })
    mongoose.connection.close()
  })
}

module.exports = {
  savePayload,
  getPayload,
}
