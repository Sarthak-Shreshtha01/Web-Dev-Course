const Course = require('../models/Course');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.updateProfile = async (req , res) =>{
    try{
        // get data
        const {dateOfBirth="" , about="" , contactNumber , gender} = req.body;
        // get userId
        const id = req.user.id;
        // validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message: 'Please enter all required fields'
            });
        }
        // find profile
        const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
    profile.gender = gender;

		// Save the updated profile
		await profile.save();

        // return response
        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            profile
        })

    }

    catch(error){
        return res.status(400).json({
            success:false,
            error:error.message
        })
    }
}

// Delete Account
// Explore how can we schedule this deletion Operation

exports.deleteAccount = async (req, res) => {
    try {
        // get userId
        const id = req.user.id;
        console.log(id)
        // find user and profile
        const userDetails = await User.findById({_id:id});
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        // TODO: UnEnroll user from all enrolled courses
        // delete user

        await Profile.findByIdAndDelete({_id:id});

        // return response
        return res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        });

    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Deletion failed",
            error:error.message
        });
    }
};


exports.getAllUserDetails = async(req,res) =>{

    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // if(!userDetails){
        //     return res.status(404).json({
        //         success: false,
        //         message: 'User not found'
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: 'User details fetched successfully',
            userDetails
        });
    }
    catch(error){
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.instructorDashboard = async(req , res) => {
  try{
    const courseDetails = await Course.findOne({instructor : req.user.id });

    const courseData = courseDetails.modifiedPaths((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const  totalAmountGenerated = totalStudentsEnrolled * course.price

      const courseDataWithStats = {
        _id : course.id,
        courseName : course.courseName,
        courseDescription : course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      }
      return courseDataWithStats
    } )

    res.status(200).json({
      courses:courseData
    });
  } 
  catch(error){
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch course data"
    }) 
  }
}