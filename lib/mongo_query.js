const Request = require("../models/request")

savePayload = (id, binId, payload) => {
  const request = new Request({
    requestId: id,
    binId: binId,
    payload: payload,
  })

  request.save().then(savedRequest => {
    console.log('request saved!')
    console.log(savedRequest)
  })
}

getPayload = (binId) => {
  Request.find({"binId":binId}).then(requests => {
    console.log('found requests!')
    console.log(requests)
  })
}

module.exports = {
  savePayload,
  getPayload,
}
