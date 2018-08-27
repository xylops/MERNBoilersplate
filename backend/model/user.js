var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    username: {type:String, require:true},
    password: {type:String, require:true},
    permission: {type: String, require: true},
    createAt: {type: Date, default: Date.now},
    token: { type: String, default: null}
}, {collection:'user'});

module.exports = mongoose.model('user', user)
