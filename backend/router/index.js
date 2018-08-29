const init = require('./init')
const userControl = require('./userControl')

module.exports = function(app){
    app.use('/', init)
    app.use('/api/user', userControl)
}