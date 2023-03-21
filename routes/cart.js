const e = require("express")
const express = require("express")
const fetchuser = require("../middleware/fetchuser")
const router = express.Router()
const cart = require("../models/cart")
const item = require("../models/items")
const user = require("../models/user")

// Route 1: Fetching items From cart. Using GET req
router.get("/fetchcart", fetchuser ,async(req, res)=>{
    try {
        userId = req.user.id;
        const Item = await user.findById(userId).populate("cart").select("-password")
        res.send(Item)
    } catch (error) {
            res.status(500).send("Something went Wrong")
        }
    })
    
// Route 2: Adding item to cart. Using POST req
router.post("/addtocart/:id", fetchuser ,async(req, res)=>{
        try {
            userId = req.user.id;
            const Item = await item.findById(req.params.id)
            const Usser = await user.findById(userId).populate("cart")
            // const CartItem = await cart.findOne({item: req.params.id})
            const already = await Usser.cart.filter((ele) => {
                return ele.item === req.params.id
                })
                console.log(already);
            if (already.length === 0) {
                const cartItem = new cart({
                    name : Item.name,
                    price: Item.price,
                    category: Item.category,
                    image: Item.image,
                    item: req.params.id
                })
                const User = await user.findByIdAndUpdate(userId, {$push: {cart : cartItem}}, {new: true})
                await User.save()
                await cartItem.save()
                res.send(cartItem)
            }else{
                res.json({"success":"already"})
            }
            
        } catch (error) {
                res.status(500).send("Something went Wrong")
            }
        })

// Route 3: Dleting item from cart. Using DELETE req
router.delete("/deletfromcart/:id", fetchuser ,async(req, res)=>{
        try {
            userId = req.user.id
            const User = await user.findById(userId)
            const Item = await cart.findByIdAndDelete(req.params.id)
            const i = User.cart.indexOf(Item._id)
            const sp = User.cart.splice(i,1)
            const newUser = await user.findByIdAndUpdate(userId, {$set: {cart : User.cart}}, {new: true})
            const Cart = await cart.find({})
            res.send(Item)
        } catch (error) {
                res.status(500).send("Something went Wrong")
            }
        })

// Route 4: Emptying the cart. Using DELETE req
router.delete("/emptycart", fetchuser ,async(req, res)=>{
        try {
            const Item = await cart.deleteMany({})
            const newUser = await user.findByIdAndUpdate(userId, {$set: {cart : []}}, {new: true})
            const Cart = await cart.find({})
            res.send(Cart)
        } catch (error) {
                res.status(500).send("Something went Wrong")
            }
        })


module.exports = router