const {instance} = require("../config/razorpay")
const Course = require("../models/Course")
const User = require('../models/User')
const mailSender = require("../utils/mailSender")
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")
const { default: mongoose } = require("mongoose")


// Capture the payment and initiate the razorpay order
exports.capturePayment = async(req,res) => {
    // get courseId and userId
    const {course_id} = req.body;
    const userId = req.user.id;

    // validation
    // valid courseId
    if(!course_id){
        return res.status(400).json({
            success: false,
            message: "Invalid course ID"
        });
    };
    // valid courseDetail
    let course;
    try{
        course = await Course.findById(course_id);
        if (!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        } 
        // user already pay the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid) ){
            return res.status(400).json({
                success: false,
                message: "You have already enrolled in this course"
            });
        }
        
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in payment.js"
        });
    }
    // order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency: currency,
        receipt: `order_${course_id}`,
        notes: {
            course_id: course_id,
            userId
        }
    };

    try{
        // Initiate payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        // return response
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount : paymentResponse.amount,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "could not initite order"
        });
    }

}

// Verify signature of razorpay and server 

exports.verifySignature = async(req,res) =>{
    const webhookSecret = "12345678";
    const signature = req.headers['x-razorpay-signature'];
    // Smjh nhi aayega aur zarurat bhi nhi h, Bs aisa hota hai

    const shasum = crypto.createHmac("sha256" , webhookSecret)
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(digest === signature){
        // signature verified
        console.log("Payment is authorized");
        
        const {courseId , userId} = req.body.payload.payment.entity.notes;

        try{
            // Fullfil the action

            // Find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentEnrolled: userId}},
                {new:true},
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message: "Course not found"
                });
            } 

            console.log(enrolledCourse)

            // Find the student and add the course to their enrolled course

            const enrolledStudent = await User.findOneAndUpdate(
                {_id:userId},
                {$push:{enrolledCourses: courseId}},
                {new:true},
            );

            console.log(enrolledCourse);

            // mail send kre confirmation wala

            const emailResonse = await mailSender(enrolledStudent.email,"Congratulation from StudyNotion" ,
                "Congratulation you have a new course"
             );

            console.log(emailResonse);
            return res.status(200).json({
                success: true,
                message: "Signature verified and course enrolled",
            });

        }

        catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        
    }
    
    else{
        return res.status(400).json({
            success: false,
            message: "Invalid signature",
        });
    }

}