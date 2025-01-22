// Import model

const Post = require("../models/postModel")
const Comment = require("../models/commentModel")

// Buissiness logic

exports.createComment = async (req, res) => {
    try{
        const {post , user , body} = req.body;
        const comment = new Comment({
            post,
            user,
            body
        });
        const savedComment = await comment.save();

        // Find the post and append the new comment to the post
        const updatedPost = await Post.findByIdAndUpdate(post , {$push : {comments:savedComment._id} } , {new:true} )
        .populate("comments") //Populates comments array with comment document 
        .exec()

        res.json({
            post : updatedPost,
        })

    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
};