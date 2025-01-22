import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const PublishCourse = () => {

    const {register , handleSubmit , setValue , getValue } = useForm();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=> state.auth )
    const {course} = useSelector((state)=>state.course)
    const [loading, setLoading] = useState(false)

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        // navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async () => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
     (course.status === COURSE_STATUS.DRAFT && getValues("public") ===false )){
        // No updation in form
        // No need to make API call
        goToCourses();
        return;
     }

    //  If form is updated

    const formData = new FormData();
    formData.append("courseId" , course._id);
     const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED: COURSE_STATUS.DRAFT;
    formData.append("status" , courseStatus);
    
    setLoading(true);
    const result = await editCourseDetails(formData , token)

    if(result){
        goToCourses();
    }

    setLoading(false)

    }

    const onSubmit= () =>{
        handleCoursePublish();
    }
    
  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 ' >
      <p>Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="public">
                <input 
                type="checkbox"
                id='public'
                {...register("public")}
                className='rounded h-4 w-4'
                />
                <span className='ml-3 ' > Make this Course as Public </span>
            </label>
        </div>

        <div className='flex justify-end gap-x-3 ' >
            <button disabled={loading}
            type='button'
            onClick={goBack}
            className='flex items-center rounded-md bg-richblack-300 p-6'
            >
                Back
            </button>
            <IconBtn disabled={loading} text="Save Changes"  />
        </div>

      </form>
    </div>
  )
}

export default PublishCourse
