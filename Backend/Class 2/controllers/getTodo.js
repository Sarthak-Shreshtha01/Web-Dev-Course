
const Todo = require("../models/Todo")


exports.getTodo = async(req,res)=>{
    try{
        // Fetch all todo items from database
        const todos = await Todo.find({})
        
        // response
        res.status(200)
        .json({
            success: true,
            data: todos,
            message : "Entire todo data has been fetched"
        })
    }
    catch(error){
        console.error(error);
        res.status(500)
        .json({
            success: false,
            error: error.message,
            message: "Server Error"
        });
    }
}

exports.getTodoById = async(req,res)=>{
    try{
        // Extract todo by id
        const id = req.params.id;
        const todo = await Todo.findById({_id:id});

        // Check if todo exists
        if(!todo){
            return res.status(404)
           .json({
                success: false,
                message: "Todo not found"
            });
        }
        // Data found
        res.status(200)
       .json({
        success: true,
        data: todo,
        message: "Todo data has been fetched"
       })

    }
    catch(error){
        console.error(error);
        res.status(500)
        .json({
            success: false,
            error: error.message,
            message: "Server Error"
        });
    }
}