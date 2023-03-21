const mongoose = require("mongoose")
// const { Schema } = mongoose;

const itemSchema = new mongoose.Schema({
            name : String,
            price: Number,
            category: String,
            rating: Number,
            image: String,
            images: [String],
}, {timestamps : true})

const item = mongoose.model('item', itemSchema);
module.exports = item;