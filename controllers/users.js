const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
        model: Blog,
        attributes: {exclude: 'userId'}
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } ,
      include:[
        {
            model: Blog,
            as: 'readings',
            attributes: { exclude: ['userId','createdAt', 'updatedAt']},
            through: {
                attributes: ['readStatus', 'id']
            },
        },
      ]
    })
  
    if (user) {
        const result = user.toJSON()

        result.readings = result.readings.map(blog => {
          blog.readinglists = blog.user_blogs
          delete blog.user_blogs
          return blog
        })
        
        res.json(result)
        
    } else {
      res.status(404).end()
    }
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    user.username = req.body.username
    await user.save()
    res.json(user)
})

module.exports = router