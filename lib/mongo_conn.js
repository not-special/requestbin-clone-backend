const Request = require("../models/request")
// const mongoose = require('mongoose')
// const MONGODB_NAME = 'rb'
// const url = `mongodb://127.0.0.1:27017/${MONGODB_NAME}`

// mongoose.connect(url, { useNewUrlParser: true })

// // const db = mongoose.connection
// // db.once('open', _ => {
// //   console.log('Database connected:', url)
// // })

// const requestSchema = new mongoose.Schema({
//   id: Number,
//   binId: Number,
//   payload: Object,
// })

// const Request = mongoose.model('Request', requestSchema)

savePayload = (id, binId, payload) => {
  const request = new Request({
    id: id,
    binId: binId,
    payload: payload,
  })

  request.save().then(savedRequest => {
    console.log('request saved!')
    console.log(savedRequest)
  })

  // mongoose
  // .connect(url)
  // .then((result) => {
  //   const request = new Request({
  //     id: id,
  //     binId: binId,
  //     payload: payload,
  //   })

  //   return request.save()
  // })
  // .then(() => {
  //   console.log('request saved!')
  //   return mongoose.connection.close()
  // })
  // .catch((err) => console.log(err))

    // const request = new Request({
    //   id: id,
    //   binId: binId,
    //   payload: payload,
    // })

    // request.save().then(() => {
    //   console.log('request saved!')
    //   mongoose.connection.close()
    // })
    // .catch((err) => console.log(err))
}

getPayload = (binId) => {
  Request.find({"binId":binId}).then(requests => {
    console.log('found requests!')
    console.log(requests)
  })
  // const result = await Request.find({"binId":binId})
  // console.log("getPayload", result)
  // mongoose.connection.close()
  // return result
}

module.exports = {
  savePayload,
  getPayload,
}
