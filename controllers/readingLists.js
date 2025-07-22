const router = require('express').Router()

const { UserBlogs } = require('../models')

router.post('/', async (req, res) => {
    const user_blog = await UserBlogs.create(req.body)
    res.json(user_blog)
})

module.exports = router