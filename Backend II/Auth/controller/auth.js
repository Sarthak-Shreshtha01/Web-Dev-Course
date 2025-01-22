const bcrypt = require('bcrypt');
const User = require('../model/User')
const jwt = require('jsonwebtoken');

// signup route handler
exports.signup = async (req , res)=>{
    try{
        const {name, email, password , role} = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                msg: 'User already exists'
            });
        }
        // secure Password
        let hashedPassword ;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success: false,
                msg: 'Encryption failed'
            });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        return res.status(200).json({
            success: true,
            msg: 'User registered successfully'
        })

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            msg: 'Server error Fatt Gya'
        })
    }
}

// login

exports.login = async (req , res)=>{
    try{
        const {email, password} = req.body;
        // Check if user exists
        if(!email || !password){
            return res.status(400).json({
                success: false,
                msg: 'Please provide both email and password'
            });
        }

        // Check if user is registered
        let user = await User.findOne({email});
        // If user is not registered
        if(!user){
            return res.status(401).json({
                success: false,
                msg: 'User not registered'
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }

        // verify password & generate JWT token
        if(await bcrypt.compare(password , user.password ) ){
            let token = jwt.sign(payload ,
                 process.env.JWT_SECRET,
                {
                    expiresIn: '2h'
                });
            
            user = user.toObject();
            user.token= token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }

            res.cookie("token" , token , options).status(200).json({
                success: true,
                token,
                user,
                message: 'User logged in successfully'
            })
        }
        else{
            // Password dont match
            return res.status(401).json({
                success: false,
                msg: 'Password incorrect'
            });
        }

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            msg: 'Login failure'
        })
    }
}