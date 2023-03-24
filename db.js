const mongoose = require("mongoose")

const mongoURI = "mongodb+srv://muhammadali30905:aliahmed3905@eshopper.i8cmcho.mongodb.net/eShopper?retryWrites=true&w=majority"

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log("Mongo Connected")
    })
}

module.exports = connectToMongo