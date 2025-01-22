import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificDetails = async()=> {
            const courseData = await getFullDetailsOfCourse(courseId , token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completed));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec)=> {
                lectures += sec.subSection.length
            } )
            dispatch(setTotalNoOfLectures(lectures));
        }
    },[])

  return (
    <>
        <div>
            <VideoDetailsSideBar setReviewModal={setReviewModal} />

            <div>
                <Outlet />
            </div>

        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} /> }
    
    </>
  )
}

export default ViewCourse
