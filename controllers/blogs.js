const router = require('express').Router()

const { Blog } = require('../models')
const {blogFinder, tokenExtractor} = require('../util/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
    const userId = req.decodedToken.id
    const blog = await Blog.create(...req.body, userId)
    res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
    res.json(req.blog)
})
  
router.delete('/:id', tokenExtractor, blogFinder,  async (req, res) => {
    const userId = req.decodedToken.id
    if (userId === req.blog.userId) {
        await req.blog.destroy()
        res.status(204).end()
    }
})
  
router.put('/:id', blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
})
  
module.exports = router