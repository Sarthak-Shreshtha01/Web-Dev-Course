
//  auth , isStudent , isAdmin

const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.auth = (req , res , next) => {
    try{
        // Extract JWT token
        console.log(req.cookies.token);
        console.log(req.body.token);
        console.log(req.header('Authorization') );
        const token =  req.cookies.token || req.body.token || req.header('Authorization').replace("Bearer" , "") ; 

        if(!token){
            return res.status(401).json({
                success: false,
                message : "Token is missing"})
        }

        // Verify JWT token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload)
            req.user = payload;
        }
        catch(err){
            return res.status(401).json({
                success: false,
                message : "Token is invalid"})
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success: false,
            message : "Server error in token"})
    }
}

exports.isStudent = (req, res, next) => {
    try{
        if(req.user.role !=='Student'){
            return res.status(403).json({
                success: false,
                message : "User is not a student"})
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message : "Server error in role check"})
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        if(req.user.role!=='Admin'){
            return res.status(403).json({
                success: false,
                message : "User is not an admin"})
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message : "Server error in role check"})
    }
}