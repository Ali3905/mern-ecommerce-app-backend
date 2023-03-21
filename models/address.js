const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
         name: String,
         email: String,
         phone: String,
         address: String,
        }, {timestamps : true})

const address = mongoose.model('address', addressSchema);
module.exports = address;