// Import model

const Post = require("../models/postModel")
const Like = require("../models/likeModel")

// Buissiness logic

exports.likePost = async (req, res) => {
    try{
        const {post , user} = req.body;
        const like = new Like({
            post,
            user
        });
        const savedLike = await like.save();

        // Find the post and append the new comment to the post
        const updatedPost = await Post.findByIdAndUpdate(post , {$push : {likes:savedLike._id} } , {new:true} )
        .populate("likes").exec();

        res.json({
            post : updatedPost,
        })

    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
};

exports.unlikePost = async (req, res) => {
    try{
        const {post , like} = req.body;
        
        const deleteLike = await Like.findOneAndDelete({post:post , _id:like});

        // Find the post and append the new comment to the post
        const updatedPost = await Post.findByIdAndUpdate(post , {$pull : {likes:deleteLike._id} } , {new:true} )
        // .populate("likes").exec();

        res.json({
            post : updatedPost,
        });

    }
    catch(error){
        console.error(error);
        res.status(400).json({message: "Server Error"})
    }
};