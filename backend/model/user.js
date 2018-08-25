var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    username: {type:String, require:true},
    password: {type:String, require:true},
}, {collection:'user'});

module.exports = mongoose.model('user', user)
