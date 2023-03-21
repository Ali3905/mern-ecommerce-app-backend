const express = require("express")
const fetchuser = require("../middleware/fetchuser")
const router = express.Router()
const order = require("../models/order")
const user = require("../models/user")

router.get("/getorders", fetchuser ,async(req, res)=>{
    try{
        userId = req.user.id;
        const User = await user.findById(userId).populate("orders")
        res.send(User.orders)

}catch (error){
    res.status(500).send("Something went wrong")
}
})


router.post("/addorder", fetchuser ,async(req, res)=>{
    try{
        userId = req.user.id;
    const { items, bill, address } = req.body
    const Order = new order({
        items: items,
        bill: bill,
        address: address
    })

    const User = await user.findByIdAndUpdate(userId, {$push: {orders : Order}}, {new: true})
    await User.save()
    await Order.save()
    res.send(Order)
}catch (error){
    res.status(500).send("Something went wrong")
}
})

module.exports = router