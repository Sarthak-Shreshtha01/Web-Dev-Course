import React from 'react'
import { useSelector } from 'react-redux'
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import { FaCheck } from 'react-icons/fa'
import CourseBuilderForm from './CourseBuider/CourseBuilderForm'
import PublishCourse from './PublishCourse/PublishCourse'

const RenderSteps = () => {

    const {step} = useSelector((state)=> state.course);

    const steps = [
        {
            id:1,
            title: "Course Information"
        },
        {
            id:2,
            title: "Course Builder"
        },
        {
            id:3,
            title: "Publish"
        },

    ]

  return (
    <>
      <div>
        {steps.map((item)=> (
            <>
                <div>
                    <div className={`${step===item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50 " 
                        :
                        "border-richblack-700 bg-richblack-800 text-richblack-300 "
                    }`} >

                    {
                        step> item.id ? (<FaCheck/>) : (item.id)
                    }

                    </div>
                </div>

                {/* Add Code for Dashes between Courses */}
            </>
        ) )}
      </div>

        <div>
            {steps.map((item) => (
                <>
                    <div>
                        <p>{item.title}</p>
                    </div>
                </>
            ) )}
        </div>

        {step === 1 && <CourseInformationForm/> }
        {step === 2 && <CourseBuilderForm/> }
        {step === 3 && <PublishCourse/> }

    </>
  )
}

export default RenderSteps
