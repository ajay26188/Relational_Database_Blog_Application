const Blog = require('./blog')
const User = require('./user')
const UserBlogs = require('./user_blogs')
const SessionStorage = require('./session_storage')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: UserBlogs, as: 'readings' })
Blog.belongsToMany(User, { through: UserBlogs, as: 'readinglists' })

module.exports = {
  Blog,
  User,
  UserBlogs,
  SessionStorage
}