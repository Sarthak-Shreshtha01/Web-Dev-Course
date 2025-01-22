const User = require("../models/User");
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto");

// Reset Password Token
exports.resetPasswordToken = async (req , res) =>{
    try{
        // Get email from req body
        const email = req.body.email;
        // Check user for this email , email verification
        const user = await User.findOne({email:email});
        if(!user ){
            return res.status(404).json({success:false , message: "User not found or not verified"});
        }
        // Generate token
		const token = crypto.randomBytes(20).toString("hex");
        // Update user by adding token and expiration time

        const updatedDetails = await User.findOneAndUpdate(
            {email:email},
            {
                token:token, 
                resetPasswordExpires : Date.now() + 5*60*1000,
            },
            {new:true}
        );
        // Create URl
        const url = `https://localhost:3000/update-password/${token}`
        // send mail containing the url
        await mailSender(email , 
            "Password Reset Link",
            `Password Reset Link: ${url}`);

        // return response
        return res.json({
            success: true,
            message: "Reset password link sent to your email",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset pwd mail",
            error: error,
        })
    }
}

// resetPassword

exports.resetPassword = async (req , res) =>{
    try{
        // Get token from req params
        const {password , confirmPassword , token} = req.body;

        // Validation
        if(password!== confirmPassword){
            return res.status(400).json({
                success:false ,
                message: "Passwords do not match"
            });
        }

        // Find user by token and expiration time
        const userDetails = await User.findOne({
            token:token,
        });

        // invalid Token
        if(!userDetails){
            return res.status(404).json({success:false , message: "Token expired or invalid"});
        }

        // Token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success: false ,
                message: "Token expired"
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )
        // return response
        res.json({
            success: true,
            message: "Password reset successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting password",
        })
    }
}