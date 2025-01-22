const Course = require("../models/Course")
const Category = require("../models/Category")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")

// CreateCourse handler function

exports.createCourse = async (req, res) => {
    try{
        // Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag : _tag,
			category,
			status,
			instructions : _instructions,
		} = req.body;

        // Get Thumbnail
        const thumbnail = req.files.thumbnailImage;

        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        console.log("tag", tag)
        console.log("instructions", instructions)

        // Validation
        if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag.length ||
			!thumbnail ||
			!category ||
            !instructions.length
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}

        if(!status || status === undefined) {
            status = "Draft";
        }

        // Check for instructor
        const instructorDetails = await User.findById(userId , {
            accountType : "Instructor"
        });

        // TODO: Verify that user id and instructordetails._id are same or different
        if(!instructorDetails){
            return res.status(403).json({
                success:false,
                message: "You are not authorized to create a course"
            })
        }

        console.log("Instructor details: " , instructorDetails);

        // Check if given tag is valid or not
        const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}

        // Upload thumbnail to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);
        console.log(thumbnailImage)

        // Create an entry for the course
        const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

        // User ko update ko ie Add the new course to Course of user schema of Instructor
        await User.findByIdAndUpdate(
            {_id : instructorDetails._id} ,
            {
                $push: {
                    courses: newCourse._id
                }
            },
            {new:true}
        );
        

        // Update Category ka Schema 
        // Khud se

        const categoryDetails2 =  await Category.findByIdAndUpdate(
            {_id:category},
            {
                $push:{
                    course:newCourse._id,
                },
            },
            {new:true}
        );
        console.log("HEREEEEEEEE", categoryDetails2)


        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        })
    }
    catch(error){
        console.error("Error in createCourse: ", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course"
        })
    }
}

// Edit Course Details
exports.editCourse = async(req,res) => {
    try{
        const {courseId} = req.body;
        const updates = req.body
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        // If Thumbnail image is found , update it
        if(req.files){
            console.log("Thumbnail update ")
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fileds present in request body

        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions" ){
                    course[key] =JSON.parse(updates[key]) 
                }
                else{
                    course[key] = updates[key]
                }
            }
        }

        await course.save();

        const updateCourse = await Course.findOne({
            _id: courseId,
        })
        .populate({
            path: "instructor",
            populate:{
                path:"additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec()

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updateCourse
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to update course details",
            error: error.message
        })
    }
}

// Get all courses handler function
exports.getAllCourses = async(req,res)=>{
    try{
        const allCourses = await Course.find({status: "Published" } , {
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReview : true,
            studentsEnrolled : true,
        }).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            data: allCourses
        })

    }
    catch(error){
        console.error("Error in showAllCourses: ", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all courses"
        })
    }
}

// Get One Single Course Details
// exports.getCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const courseDetails = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()
//     // console.log(
//     //   "###################################### course details : ",
//     //   courseDetails,
//     //   courseId
//     // );
//     if (!courseDetails || !courseDetails.length) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find course with id: ${courseId}`,
//       })
//     }

//     if (courseDetails.status === "Draft") {
//       return res.status(403).json({
//         success: false,
//         message: `Accessing a draft course is forbidden`,
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       data: courseDetails,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// Get course Details

exports.getCourseDetails = async(req,res) =>{
    try{
        // get id
        const {courseId} = req.body;

        // Find course details
        const courseDetails = await Course.findOne({
         _id: courseId,
        })
        .populate({
            path: "instructor",
            populate: {
            path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
            path: "subSection",
            select: "-videoUrl",
            },
        })
        .exec()

        // validation
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: `Course not found with courseId ${courseId}`
            });
        }

        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
        })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        // return response
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: {courseDetails , message: totalDuration },
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message : error.message,
        })
    }
}

exports.getFullCourseDetails = async(req,res) => {
    try{
        const { courseId } = req.body
        const userId = req.user.id
        const courseDetails = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()
    
        let courseProgressCount = await CourseProgress.findOne({
          courseID: courseId,
          userId: userId,
        })
    
        console.log("courseProgressCount : ", courseProgressCount)
    
        if (!courseDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
          })
        }
    
        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }
    
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    
        return res.status(200).json({
          success: true,
          data: {
            courseDetails,
            totalDuration,
            completedVideos: courseProgressCount?.completedVideos
              ? courseProgressCount?.completedVideos
              : [],
          },
        })
    }
    catch ( error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
  // Delete the Course
  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnroled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }
  