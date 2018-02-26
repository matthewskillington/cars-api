var mongoose = require('mongoose');

var carSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Car', carSchema)