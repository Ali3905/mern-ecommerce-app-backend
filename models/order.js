const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

            // items :   [ {id: Number,  name : String,  price: Number,  category: String,  rating: Number,  image: String,} ],
            // bill : {items_price : Number,  shipping : Number,   discount_in_percent : Number,   total : Number},
            // address : { name: String,   email: String,   phone: String,   address: String, },
            items: [],
            bill: {},
            address: {}
        }, {timestamps : true})

const order = mongoose.model('order', orderSchema);
module.exports = order;