const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// Create rating
exports.createRating = async(req , res) =>{
    try{
        // Get user id
        const userId = req.user.id;
        // Fetch data from req body
        const {rating , review , courseId} = req.body;
        // check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId, 
                studentsEnrolled : {$elemMatch : {$eq : userId}},
            }
        );
        if(!courseDetails){
            return res.status(401).json({
                success: false,
                message: "User not enrolled in the course"
            })
        }
        // check if user already has given a review
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        })
        if(alreadyReviewed){
            return res.status(401).json({
                success: false,
                message: "User already reviewed this course"
            })
        }
        // Create rating and review
        const ratingReview = await RatingAndReview.create({
            rating , review,
            course:courseId,
            user : userId,
        })

        // Update course rating and review count
        const updatedCourseDetails =  await Course.findByIdAndUpdate({_id: courseId},
            {
                $push:{
                    ratingAndReview : ratingReview._id,
                }
            },
            {new:true}
        )

        console.log(updatedCourseDetails)

        // Return success message
        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully",
            ratingReview
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create rating and review"
        })
    }
}

// Get average Rating

exports.getAverageRating = async(req, res) => {
    try{
        // Get course id
        const courseId = req.body.courseId;

        // Calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id: null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])

        // return rating
        if(result.length>0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })

        }

        // If no rating/review exist
        return res.status(200).json({
            success: true,
            message:"average rating is 0 , no rating is given till now",
            averageRating: 0,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch average rating"
        })
    }
}


// get all rating and review

exports.getAllRating = async (req , res) =>{
    try{
        const allReviews = await RatingAndReview.find({})
        .sort({rating: "desc"})
        .populate({
            path: "user",
            select: "firstname lastname email image",
        })
        .populate({
            path:"course",
            select: "courseName",
        })
        .exec();

        return res.status(200).json({
            success : true,
            message: "All rating and review fetched successfully",
            data : allReviews,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all rating and review"
        })
    }
}