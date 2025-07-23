const jwt = require('jsonwebtoken')

const { Blog, SessionStorage } = require('../models')
const { SECRET } = require('./config')

const blogFinder = async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      const error = new Error('Blog not found')
      error.status = 404
      throw error // this will be caught by express-async-errors and passed to errorHandler
    }
    req.blog = blog
    next()
} 

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        console.log(authorization.substring(7))
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)

        const session = await SessionStorage.findOne({
          where: {
            token: authorization.substring(7),
            isValid: true,
          },
        })
    
        if (!session) {
          return res.status(401).json({ error: 'session expired or invalid' })
        }

        req.session = session
        
      } catch(error){
        console.error('JWT VERIFY ERROR:', error.message)
        return res.status(401).json({ error: 'token invalid' })
      }
    }  else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.status === 404) {
      return response.status(404).send({ error: error.message })
    }

    if (error.name === 'SequelizeValidationError') {
        return response.status(400).json({ error: error.errors[0].message })
    }
    
    if (error.name === 'SequelizeDatabaseError') {
        return response.status(400).json({ error: error.message })
    }
  
    // fallback: 500 Internal Server Error
    return response.status(500).send({ error: 'Internal Server Error' })
}
  
module.exports = {
    errorHandler,
    blogFinder,
    tokenExtractor
}