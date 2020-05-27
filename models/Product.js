const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);