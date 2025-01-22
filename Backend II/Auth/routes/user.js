const express = require('express');
const router = express.Router();

const {login , signup} = require('../controller/auth');
const{auth , isStudent , isAdmin} = require('../middlewares/auth');

router.post("/login" , login)
router.post("/signup" ,signup )


// protected routes

router.get("/test" , auth , (req,res) => {
    res.json({
        success : true,
        message : "You are authenticated!"
    })
})

router.get("/student" , auth , isStudent , (req,res) => {
    res.json({
        success : true,
        message : "You are a student and authenticated!"
    })
})

router.get("/admin" , auth , isAdmin , (req,res) => {
    res.json({
        success : true,
        message : "You are an admin and authenticated!"
    })
})

module.exports = router;