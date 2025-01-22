import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'

const CourseReviewModal = ({setReviewModal}) => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {courseEntireData} = useSelector((state)=>state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    useEffect(()=> {
        setValue("courseExperience" , "");
        setValue("courseRaing",0);
    },[]);

    const ratingChanged = (newRating)=>{
        setValue("courseRating", newRating)
    }

    const onSubmit = async(data)=> {
        await createRating({
            courseId: courseEntireData._id,
            rating:data.courseRating,
            review:data.courseExperience,
        });
        setReviewModal(false);
    }
    
  return (
    <div>
      <div>
        {/* Modal Header */}
        <div>
            <p>Add Review</p>
            <button
            onClick={()=> setReviewModal(false)}
            >
                Close
            </button>
        </div>

        {/* Modal Body */}
        <div>
            <div>
                <img src={user?.image} 
                alt="user image"
                className='aspect-square w-[50px] rounded-full object-cover ' 
                />

                <div>
                    <p>{user?.firstName} {user?.lastName}</p>
                    <p>Posting Publicaly</p>
                </div>

                <form 
                onSubmit={handleSubmit(onSubmit)}
                className='mt-6 flex flex-col items-center '
                >

                    <ReactStars 
                        count={5}
                        onchange={ratingChanged}
                        size={24}
                        activeColor = '#ffd700'
                    />

                    <div>
                        <label htmlFor="courseExperience">
                            Add Your Experience
                        </label>

                        <textarea 
                        id="courseExperience"
                        placeholder='Add Your Experience here'
                        {...register("courseExperience" , {required:true} )}
                        className='form-style min-h-[130px] w-full'
                         />

                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your Experience
                                </span>
                            )
                        }

                        {/* Cancel and Save Button */}
                        <div>
                            <button
                            onClick={()=> setReviewModal(false)}
                            >
                                Cancel
                            </button>
                            <IconBtn 
                                text="save"
                            />
                        </div>

                    </div>

                </form>

            </div>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal
