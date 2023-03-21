const express = require("express")
const router = express.Router()
const user = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")

const JWT_SEC = "ali"

// Route 1: Creating a user using POST req
router.post("/signup", async(req, res)=>{
    try {
        const { name, email, password } = req.body

        const salt = await bcrypt.genSalt(5);
        const pass = await bcrypt.hash(password, salt)
        const User  = new user({
            name: name,
            email: email,
            password: pass,
            cart: [],
            orders: [],
            addresses: []

        })
        const data = {
            user : {
                id : User.id
            }
        }
        const authToken = jwt.sign(data, JWT_SEC)

        await User.save()
        res.json({authToken, User})
    } catch (error){
        res.status(500).send("Something went wrong")
    }
})

// Route 2: Fetching all users using GET req
router.post("/login", async(req, res)=>{
    try {
        let success = false
        const { email, password } = req.body
        const User = await user.findOne({email})
        if (!User)  {
            res.send("Login with correct creds")
        }else{
        const comparePass = await bcrypt.compare(password, User.password)
        if (!comparePass)  {
            res.send("Login with correct creds")
        }else{
        const data = {
            user : {
                id : User.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SEC)
        success = true
        res.send({success, authToken, User})
        }}
    } catch (error){
        success = false
        res.status(500).json(success, error.message)
    }
})

// // Route 3: Getting a user using POST req
// router.post("/getuser",fetchuser, async(req, res)=>{
//     try {
//         userId = req.user.id;
//         const User = await user.findById(userId).populate("cart").select("-password")
//         res.send(User)
//       } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//       }
// })

// // Route 3: Getting a user using POST req
// router.put("/update",fetchuser, async(req, res)=>{
//     try {
//         console.log(1);
//         userId = req.user.id;
//         const User = await user.findByIdAndUpdate(userId, {$push: {cart : req.body.id}}, {new: true})
//         res.send(User)
//       } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//       }
// })


module.exports = router