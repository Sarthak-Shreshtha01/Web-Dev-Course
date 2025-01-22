const Post = require("../models/postModel");

exports.createPost = async (req , res) =>{
    try{
        const {title , body} = req.body;
        const post = new Post({
            title,
            body,        
        });

        const savedPost = await post.save();

        res.json({
            post: savedPost,
        });
    }
    catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
}

exports.getAllPosts = async (req , res) => {
    try{
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            posts,
        });
    }
    catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
}