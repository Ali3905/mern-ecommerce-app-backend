const connectToMongo = require("./db")
const express = require("express")
const cors = require("cors")
// const path = require("path")
const item = require("./models/items")

connectToMongo();
const app = express();
app.use(express.json());
app.use(cors())


// app.use("/api", require("./routes/item"))
app.use("/api", require("./routes/cart"))
app.use("/api", require("./routes/address"))
app.use("/api", require("./routes/order"))
app.use("/api", require("./routes/user"))

app.get("/home", (req, res) => {
    res.send("Home page");
  });

  app.get("/getItems", async(req, res)=>{
    
    try {
        const items = await item.find({})
        res.send({"hlo": "hlo", items})
    } catch (error) {
        res.status(500).send("Something went Wrong")
    }
})

// app.use(express.static(path.join(__dirname, "./client/build")))

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, './client/build/index.html'))
// })

app.listen(8000, ()=>{
    console.log("Server is running on localhost: 8000" );
})