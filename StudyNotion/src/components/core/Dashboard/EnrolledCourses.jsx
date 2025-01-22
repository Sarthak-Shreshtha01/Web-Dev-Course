import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import ProgressBar from '@ramonak/react-progress-bar'
import { useState } from 'react'
const EnrolledCourses = () => {

    const {token} = useSelector((state)=> state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState(null)

    const getEnrolledCourses = async() => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response)
        }
        catch(error){
            console.log("Unable to fetch Enrolled Courses");
        }
    }

    useEffect(()=>{
        getEnrolledCourses();
    },[])

  return (
    <div className='text-white' >
      <div>Enrolled Courses</div>
      {
        !enrolledCourses ? (<div>
            Loading...
        </div>)
        :
        !enrolledCourses.length ? (<p>You have not enrolled in any Course Yet</p>)
        :
        (<div>
            <div>
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
                {/* Cards Shuru hote hai ab */}
                {
                    enrolledCourses.map((course , index)=> {
                        <div>
                            <div>
                                <img src={course.thumbnail} />
                                <div>
                                    <p>{course.courseName}</p>
                                    <p>{course.courseDescription}</p>
                                </div>
                            </div>

                            <div>
                                {course.totalDuration}
                            </div>\

                            <div>
                                <p>Progress: {course.progressPercentage}  </p>
                                <ProgressBar
                                    completed = {course.progressPercentage || 0}
                                    height = '8px'
                                    isLabelVisible={false}
                                />
                            </div>

                        </div>
                    })
                }
            </div>
        </div>)
      }
    </div>
  )
}

export default EnrolledCourses
