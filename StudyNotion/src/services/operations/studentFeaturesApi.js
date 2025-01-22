import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import toast from "react-hot-toast";


const {COURSE_PAYMENT_API , COURSE_VERIFY_API , SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = ()=>{
            resolve(true);
        }
        script.onerror = ()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    } )
}

export async function buyCourse(){
    const toastId = toast.loading("Loading...");
    try{
        // Load the Script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("RazorPay SDK failed");
            return;
        }

        // Initiate the order
        const orderResponse = await apiConnector("POST" ,COURSE_PAYMENT_API, 
            {courses},
            {
                Authorization: `Bearer ${token}`
            }
         )

         if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
         }

        // Option

        const option = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function(response){
                // Send successful wla mail
                
            }
        }

    }
    catch(error){
        toast.error(error.message);
    }
}