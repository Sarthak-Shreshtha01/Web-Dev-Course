const Section = require("../models/Section")
const Course = require("../models/Course")

exports.createSection = async (req, res) => {
    try{
        // data fetch
        const {sectionName , courseId} = req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message : "Enter all details"
            })
        }
        // create section
        const newSection = await Section.create({sectionName});
        // Update course with section id
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push: { courseContent: newSection._id }
            },
            {new:true}
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // return response
        res.status(200).json({
            success: true,
            message : "Section created successfully",
            updatedCourseDetails
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message : "Section creation unsuccessfull"
        })
    }
}

exports.updateSection = async (req, res) => {
    try{
        // Data input
        const {sectionName , sectionId ,courseId } = req.body;
        // Data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message : "Enter all details"
            })
        }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new:true});

        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path: "subSection",
            },
        })
        .exec()
        // return res
        res.status(200).json({
            success: true,
            message : "Section updated successfully",
            data:course,
        })

    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message : "Section update unsuccessfull"
        })
    }
}


exports.deleteSection = async (req, res) => {
    try{
        // Get Id - Sending ID in params
        const {sectionId} = req.bdoy;

        // Course se bhi update krna hai

        // delete data
        await Section.findByIdAndDelete(sectionId);
        // TODO: do we need to delete the entry from CourseDetails
        // return res
        res.status(200).json({
            success: true,
            message : "Section deleted successfully",
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message : "Section deletion unsuccessfull"
        })
    }
}