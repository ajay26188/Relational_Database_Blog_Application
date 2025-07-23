const router = require('express').Router()

const {User, SessionStorage} = require('../models/index')
const { tokenExtractor } = require('../util/middleware')

//Logout router /api/logout
router.delete('/', tokenExtractor, async (req, res) => {
    await req.session.destroy()
    res.status(204).end()
})

module.exports = router