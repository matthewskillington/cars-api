var mongoose = require('mongoose');

var carSchema = mongoose.Schema({
    id: Number,
    manufacturer: String,
    model: String,
    power: Number,
    price: Number,
    imageUrl: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Car', carSchema)