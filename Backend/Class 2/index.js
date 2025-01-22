
const express = require('express');
const app = express();

// Load configuration from env

const PORT = process.env.PORT || 4000;

// Middleware to parse Json request body
app.use(express.json())

// Import routes for TODO api
const todoRoutes = require("./routes/todos");

app.use("/api/v1" , todoRoutes);

// Start server

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})

// Connect to database

const dbConnect = require("./config/database");
dbConnect();

app.get("/" , (req,res) =>{
    res.send(`<h1>This is Homepage</h1>`);
})

