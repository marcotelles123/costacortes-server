
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    width: Number,
    heigth: Number,
    date: Date,
});

module.exports = mongoose.model('Product', ProductSchema);