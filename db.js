const mongoose = require("mongoose")

const mongoURI = "mongodb://localhost:27017/eshopper"

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log("Mongo Connected")
    })
}

module.exports = connectToMongo