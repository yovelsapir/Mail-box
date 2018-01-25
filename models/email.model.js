var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    getter: {type: String, required: true},
    sender: {type: String, required: true},
    sendername: {type: String, required: true},
    date: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true},
    category: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Email', schema);