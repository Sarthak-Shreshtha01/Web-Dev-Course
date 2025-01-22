
const Todo = require("../models/Todo")


exports.createTodo = async(req,res)=>{
    try{
        // extract title and description from request body
        const {title,description} = req.body;
        // create a new Todo object and insert it into DB
        const response = await Todo.create({title,description});
        // Send a json response with success flag
        res.status(200).json(
            {
                success:true,
                data:response,
                message:"Entry created successfully"
            }
        )
    }
    catch(error){
        console.error(error);
        console.log(error);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:"Failed to create entry"
        })
    }
}