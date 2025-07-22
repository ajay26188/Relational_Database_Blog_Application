const router = require('express').Router()

const { UserBlogs } = require('../models')
const { tokenExtractor, blogFinder } = require('../util/middleware')

router.get('/', async (req, res) => {
    const user_blog = await UserBlogs.findAll()
    res.json(user_blog)
})

router.post('/', async (req, res) => {
    const user_blog = await UserBlogs.create(req.body)
    res.json(user_blog)
})

router.put('/:id', tokenExtractor, async(req, res) => {
    const userId = req.decodedToken.id
    const userBlog = await UserBlogs.findByPk(req.params.id)

    if (!userBlog) {
        return res.status(404).json({ error: 'Reading entry not found' })
    }
    if (userId === req.body.userId) {
        userBlog.readStatus = req.body.readStatus
        await userBlog.save()
        res.status(200).json(userBlog)
    } else {
        return res.status(403).json({error: "Unauthorized to perform this operation."})
    }
})

module.exports = router