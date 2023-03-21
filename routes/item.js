const express = require("express")
const fetchuser = require("../middleware/fetchuser")
const router = express.Router()
const item = require("../models/items")

// Route 1: Getting All items
router.get("/getItems", async(req, res)=>{
    
    try {
        const Items = await item.find({})
        res.send(Items)
    } catch (error) {
        res.status(500).send("Something went Wrong")
    }
})


// Route 2: Adding item
router.post("/addItem", async (req, res)=>{
    
    try {
        const { name, price, category, rating, image, images  } = req.body;
        const Item = new item({
            name, price, category, rating, image, images
        })
        const saveditem = await Item.save()
        res.send(saveditem)
    } catch (error) {
        res.status(500).send("Something went Wrong")
    }
})

// Route 3: Deleting item
router.delete("/deleteItem/:id", async(req, res)=>{
    
    try {
        const Item = await item.findByIdAndDelete(req.params.id)
        res.send(Item)
    } catch (error) {
        res.status(500).send("Something went Wrong")
    }
})

module.exports = router