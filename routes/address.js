const express = require("express")
const fetchuser = require("../middleware/fetchuser")
const router = express.Router()
const addres = require("../models/address")
const user = require("../models/user")

// Route 1: Fetching all addresses Using GET req
router.get("/getaddresses", fetchuser ,async (req, res)=>{
    
    try {
        userId = req.user.id;
        const Item = await user.findById(userId).populate("addresses")
        res.send(Item.addresses)
    } catch (error) {
        res.status(500).json({"success": "fail"})
        
    }
})

// Route 2: Adding address Using POST req
router.post("/addaddress", fetchuser ,async (req, res)=>{
    
    try {
        const { name, email, phone, address } = req.body
        const Address = new addres({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        })
        const User = await user.findByIdAndUpdate(userId, {$push: {addresses : Address}}, {new: true})
        await User.save()
        await Address.save()
        res.send(Address)
        // res.json({"success": "success"})
    } catch (error) {
        res.status(500).json({"success": "fail"})
        
    }
})

// Route 3: Removing address Using DELETE req
router.delete("/removeaddress/:id", fetchuser ,async (req, res)=>{
    
    try {
        userId = req.user.id
        const Address = await addres.findByIdAndDelete(req.params.id)

        const User = await user.findById(userId)
        const i = User.addresses.indexOf(Address._id)
        const sp = User.addresses.splice(i,1)
        const newUser = await user.findByIdAndUpdate(userId, {$set: {addresses : User.addresses}}, {new: true})
        
        console.log(2);
        const addresses = await addres.find({})
        res.send(addresses)
        // res.json({"success": "success"})
    } catch (error) {
        res.status(500).json({"success": "fail"})
        
    }
})


module.exports = router