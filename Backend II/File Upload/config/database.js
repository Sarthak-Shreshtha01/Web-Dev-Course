const mongoose = require('mongoose');

require("dotenv").config();

exports.Connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("Connection Successful with DB");
    })
    .catch(()=>{
        console.log("Connection Failed");
    })
}