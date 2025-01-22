const jwt= require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/User")

// auth
exports.auth = async (req, res, next) => {
    try{
        // Extract token
        const token = req.cookies.token 
            || req.body.token 
            || req.header("Authorization").replace("Bearer" , "");

        // If token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
        }

        // Verify token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log(decode)
        }
        catch(err){
            return res.status(403).json({
                success:false,
                message:"Token is invalid"
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in Verification of token"
        });
    }
}

// isStudent
exports.isStudent = async(req, res, next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(403).json({
                success:false,
                message:"This is protected route for student"
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in checking user role"
        });
    }
}

// isInstructor

exports.isInstructor = async(req, res, next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(403).json({
                success:false,
                message:"This is protected route for instructor"
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in checking user role"
        });
    }
}

// isAdmin

exports.isAdmin = async(req, res, next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(403).json({
                success:false,
                message:"This is protected route for admin"
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in checking user role"
        });
    }
}