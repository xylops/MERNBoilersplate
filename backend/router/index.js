const init = require('./init')

module.exports = function(app){
    app.use('/', init)
}