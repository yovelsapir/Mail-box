var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    sender: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Email', schema);