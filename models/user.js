const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        cart: [{type: "ObjectId", ref: "cart"}],
        orders: [{type: "ObjectId", ref: "order"}],
        addresses: [{type: "ObjectId", ref: "address"}]
        }, {timestamps : true})

const user = mongoose.model('user', userSchema);
module.exports = user;