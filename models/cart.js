const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
            name : String,
            price: Number,
            category: String,
            image: String,
            item: String,
            // images: [String],
}, {timestamps : true})

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;