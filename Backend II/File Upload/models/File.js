const mongoose = require('mongoose');
const nodemailer = require("nodemailer")

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
})

// Post middleware
fileSchema.post("save" , async function(doc){
    try{
        console.log(doc)
        // Transporter
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // send email
        const info = await transporter.sendMail({
            from: 'Sarthak',
            to: doc.email,
            subject: 'New File Uploaded',
            text: `You have uploaded a new file: ${doc.name}. Visit the website to view it`,
        });

        console.log("Info" , info);
    }
    catch(error){
        console.error("Error in file save middleware");
        console.error(error);
        throw error;
    }
})

module.exports = mongoose.model('File', fileSchema);