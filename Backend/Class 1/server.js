
const express = require('express');
const app = express(); 

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