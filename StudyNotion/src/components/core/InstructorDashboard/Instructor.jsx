import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {

    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=>state.user)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([]);

    useEffect(()=> {
        const getCourseDataWithStats = async() => {
            setLoading(true);

            const instructorApiData = await getInsructorData(token);
            const result = await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if(instructorApiData.length)
                setInstructorData(instructorApiData);

            if(result){
                setCourses(result);
            }

            setLoading(false);

        }
        getCourseDataWithStats()
    } , [])

    const totalAmount = instructorData?.reduce((acc , curr) => acc + curr.totalAmountGenerated ,0 );
    const totalStudents = instructorData?.reduce((acc , curr) => acc + curr.totalStudentsEnrolled ,0 );



  return (
    <div className='text-white' >
      <div>
        <h1>
            Hi {user?.firstName}
        </h1>
        <p>Let's start something new </p>
      </div>

        {loading ? 
        (<div className='spinner' ></div>)
        : courses.length >0 
        ? (<div>
            <div>
                <div>
                    <InstructorChart courses={instructorData} />
                    <div>
                        <p>Statistics</p>
                        <div>
                            <p>Total Courses</p>
                            <p>{courses.length}</p>
                        </div>

                        <div>
                            <p>Total Students</p>
                            <p>{totalStudents} Students</p>
                        </div>

                        <div>
                            <p>Total Income</p>
                            <p>{totalAmount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {/* Render 3 Courses */}
                <div>
                    <p>Your Courses</p>
                    <Link to="/dashboard/my-courses" >
                        <p>View All</p>
                    </Link>
                </div>
                <div>
                    {
                        courses.slice(0,3).map((course) => (
                            <div>
                                <img src={course.thumbnail} />
                                <div>
                                    <p>{course.courseName}</p>
                                    <div>
                                        <p>{course.studentsEnrolled.length}</p>
                                        <p> | </p>
                                        <p> Rs {course.price} </p>
                                    </div>
                                </div>
                            </div>
                        ) )
                    }
                </div>
            </div>

        </div>)
        :
        (<div>
            <p>You have not created any course yet </p>
            <Link to={"/dashboard/addcourse"} >
                Create a Course
            </Link>
        </div>)
        }

    </div>
  )
}

export default Instructor
