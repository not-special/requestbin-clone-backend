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

getPayload = async (binId) => {
  const result = await Request.find({"binId":binId}).then(requests => {
    console.log('found requests!')
    console.log(requests)
    return requests
  })
  return result
}

module.exports = {
  savePayload,
  getPayload,
}
