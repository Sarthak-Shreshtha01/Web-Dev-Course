const User = require('../models/User')
const OTP = require('../models/OTP')
const otpGenerator= require("otp-generator")
const Profile = require('../models/Profile')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const mailSender = require('../utils/mailSender')
const { passwordUpdated } = require("../mail/templates/passwordUpdate")

require("dotenv").config();


// Signup
exports.signUp = async(req , res) =>{
    try{
        // Data fetch from request Body
        const {
            firstName , 
            lastName ,
            email ,
            password ,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;
        
        // Validate kro
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        // 2 password match
        if(password!== confirmPassword){
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            })
        }

        // Check user already exist or not
        const existingUser = await User.findOne({email})
        
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: 'User already is already Registered'
            })
        }
        
        // Find most recent OTP stored for the user
        const recentOTP = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP)
        // Validate OTP
        if(recentOTP.length === 0){
            // OTP not found
            return res.status(400).json({
                success: false,
                message: 'OTP not found'
            })
        }
        else if(otp!== recentOTP[0].otp){
            // OTP does not match
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved=false) : (approved=true);

        // Entry create in DB

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user = await User.create({
            firstname : firstName,
            lastname : lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType : accountType,
            approved : approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}` , 
        });

        // Return res
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user,
        })
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered',
            error: error.message,
            // message : error.message,
        })
    }
}

// Login
exports.login = async(req, res) => {
    try{
        // Get data from req.body
        const {email , password} = req.body;
        // validate Data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required, please try again",
            })
        }
        // check user exists or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered , please signup first"
            })
        }
        // Generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)){

            const payload = {
                email: user.email ,
                id: user.id,
                accountType : user.accountType,
            };

            const token = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn: "24h",
            } );

            // Save token to user document in DB
            user.token = token;
            user.password = undefined;

            // Create Cookie and send response

            const options = {
                expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token" , token , options).status(200).json({
                success: true,
                token,
                user,
                message: "Login successful",
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            })
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure",
        })
    }
    
};

// Send OTP
exports.sendOTP = async (req ,res)=>{
    try{
        // Fetch email
        const {email} = req.body

        // Check if user is already present
        const checkUserPresent = await User.findOne({email})
        // To be used in signup
    
        // If user already present
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message: 'User already present'
            })
        }

        // Generate OTP
        var otp = otpGenerator.generate(6 , {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
        });
        
        // Check if unique or not
        const result = await OTP.findOne({otp: otp});
        
        while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}

		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);

        // Return response Successfully
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        })
    }

    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'OTP cannot be sent'
        })
    }

}

// Change Password
// KHUD SE KREEE
// Check
exports.changePassword = async (req , res) =>{
    try{
        // Get user data from req.user
		const userDetails = await User.findById(req.user.id);

        // get data from req body
        const { oldPassword , newPassword } = req.body;
        // get old password, new password 
        
        // Validate old password

        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );

        if(!isPasswordMatch){
            // if old password does not match

            return res.status(401).json({
                success: false,
                message: 'Old password is incorrect'
            })
        }
        

        if(newPassword!== confirmPassword){
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            })
        }
        
        // Update Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password: hashedPassword},
            {new:true}
        )

        // Send mail to user
        try{
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstname} ${updatedUserDetails.lastname}`
                )
            );
            console.log("Email sent successfully" , emailResponse.response );
        }

        catch(error){
            console.log("Error in sending email", error);
            return res.status(500).json({
                success: false,
                message: 'Error in sending email',
                error: error.message,
            });
        }
        
        // Return response
        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        })

    }
    catch(error){
        console.log("Error in updating password")
        return res.status(500).json({
            success: false,
            message: 'Password cannot be changed',
            error: error.message,
        })
    }
}