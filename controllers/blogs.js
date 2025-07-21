const router = require('express').Router()
const { Op } = require('sequelize')


const { Blog, User } = require('../models')
const {blogFinder, tokenExtractor} = require('../util/middleware')

router.get('/', async (req, res) => {
    const where= {}

    if (req.query.search) {
        where[Op.or] = [
          {
            title: {
              [Op.iLike]: `${req.query.search}%` 
            }
          },
          {
            author: {
              [Op.iLike]: `%${req.query.search}%`
            }
          }
        ]
      }

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
        model: User,
        attributes: ['name']
        },
        where
    })
    res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
    const userId = req.decodedToken.id
    const blog = await Blog.create({...req.body, userId})
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
    return res.status(403).json({ error: 'unauthorized: cannot delete this blog' })
})
  
router.put('/:id', blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
})
  
module.exports = router