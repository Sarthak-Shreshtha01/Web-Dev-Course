import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {

    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([])

    useEffect(()=> {
        const fetchCourses = async()=> {
            const result = await fetchInstructionCourses(token);
            if(result){
                setCourses(result);
            }
        }
    })

  return (
    <div className='text-white' >
      <div className='flex justify-between'>
        <h1>My Courses</h1>
        <IconBtn
            text="Add Course"
            onclick={()=> navigate("/dashboard/add-course")}
            //Todo: Add Icon Here
        />
      </div>

        {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}

    </div>
  )
}

export default MyCourses
