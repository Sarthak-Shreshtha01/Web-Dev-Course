import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import copy from 'copy-to-clipboard';

const CourseDetailsCard = ({course , setConfirmationMoadl , handleBuyCourse}) => {

    const {user} =  useSelector((state) => state.auth);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail : ThumbnailImage,
        price: CurrentPrice,
    } = course;

    const handleAddToCart = () =>{
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ){
            toast.error("You are an Instructor. You cant buy a course")
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }
        setConfirmationMoadl({
            text1: "You are not logged in",
            text2: "Please login to add this course to your cart",
            btn1Text: "Login",
            btn2Text : "Cancel",
            btn1Handler: ()=> navigate("/login"),
            btn2Handler: ()=> setConfirmationMoadl(null), 
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    }

  return (
    <div>
      <img src={ThumbnailImage}
      alt='Course image'
      className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl '
      />

      <div>
        Rs. {CurrentPrice}
      </div>

      <div className='flex flex-col gap-y-6' >
        <button
            className='bg-yellow-50'
            onClick={user && course?.studentsEnrolled.includes(user?._id)
                ? ()=> navigate("/dashboard/enrollled=courses")
                : handleBuyCourse
             }
        >
            {
                user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
            }
        </button>

        {
            (!course?.studentsEnrolled.includes(user?._id)) && (
                <button onClick={handleAddToCart} 
                className='bg-yellow-50 w-fit text-richblack-900 ' >
                    Add to Cart
                </button>
            )
        }

      </div>

      <div>
        <p>
            30-Days Money-Back Guarentee
        </p>
        <p>
            This Course Includes:
        </p>
        <div className='flex flex-col gap-y-3' >
            {
                course?.instructions?.map((item , index)=> (
                    <p key={index} className='flex gap-2' >
                        <span>{item}</span>
                    </p>
                ) )
            }
        </div>

        <div className='' >
            <button onClick={handleShare} >
                Share
            </button>
        </div>

      </div>

    </div>
    
  )
}

export default CourseDetailsCard
