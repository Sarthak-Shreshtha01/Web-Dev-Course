const mongoose = require('mongoose');

require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{console.log("DB Connected");})
    .catch((error) => {
        console.error("DB Connection Failed");
        console.error(error);
        process.exit(1);  // exits the app with a failure status code 1, signifying an error occurred.
    })
}