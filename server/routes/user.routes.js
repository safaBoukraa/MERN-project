const {register, login, logout, getLoggedUser, findAllUsers, findAllCountUsers,deleteOneUser} = require('../controllers/user.controller')

module.exports = app => {
    app.post('/api/register', register)
    // app.post('/api/admin/register', registerAdmin)
    app.post('/api/login', login)
    app.post('/api/logout', logout)
    app.get('/api/user', getLoggedUser)
    app.get('/api/users', findAllUsers)
    app.get('/api/users/count', findAllCountUsers)
    app.delete('/api/users/:id', deleteOneUser)
}