const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const parseRequest = (request, response, next) => {
  const requestData = {}
  requestData.headers = JSON.stringify(request.headers)
  requestData.payload = JSON.stringify(request.body)
  requestData.contentLength = request.headers['content-length']
  requestData.contentType = request.headers['content-type']
  requestData.method = request.method
  requestData.binPath = request.params.path
  response.locals.requestData = requestData
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  parseRequest,
  unknownEndpoint,
  errorHandler,
}