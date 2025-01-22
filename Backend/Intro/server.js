
const express = require('express');
const app = express(); 

// Specifically parse Json data & add it to the request.Body object
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.listen(3000 , ()=>{
    console.log("Server started on port 3000");
})

app.get('/' , (req,res)=>{
    res.send("Hello World");
})

app.post('/api/cars' , (req,res)=>{
    const {name,car}= req.body;
    console.log(name);
    console.log(car );
    res.send("Car Submitted");
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabases' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
} )
.then(()=>{
    console.log("Connection Successful");
})
.catch(()=>{
    console.log("Connection Failed");
})