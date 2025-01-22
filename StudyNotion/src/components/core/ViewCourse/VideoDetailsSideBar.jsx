import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const VideoDetailsSideBar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("")
    const [videobarActive, setVideobarActive] = useState("")
    const navigate = useNavigate();
    const {sectionId , subsectionId} = useParams();
    const location = useLocation();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state)=> state.viewCourse);

    useEffect(()=>{
        const setActiveFlags = ()=> {
            if(!courseSectionData.length)
                return;

            const currentSectionIndex = courseSectionData.findIndex(
                (data)=> data._id === sectionId
            )

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data)=> data._id === subsectionId
            )

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            // Set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // set current subsection here
            setVideobarActive(activeSubSectionId);

        }
        setActiveFlags();
    }, [courseSectionData , courseEntireData , location.pathname ] )


  return (
    <>
      <div>
        {/* For buttons and heading */}
        <div>
            {/* For buttons */}
            <div>
                <div onClick={()=> {
                    navigate("/dashboard/enrolled-courses")
                }} >
                  Back
                </div>

                <div>
                  <IconBtn 
                    text="Add Review"
                    onClick={()=> setReviewModal(true)}
                  />
                </div>
            </div>

            {/* For Heading or title */}

            <div>
                <p>{courseEntireData?.courseName}</p>
                <p>{completedLectures?.length} / {totalNoOfLectures}</p>
            </div>

        </div>

        {/* For Section and subsection */}
        <div>
            {
                courseSectionData.map((course , index)=> (
                    <div
                    onClick={()=>setActiveStatus(course?._id)}
                    key={index}
                    >

                        {/* Section */}

                        <div>
                            <div>
                                {course?.sectionName}
                            </div>
                        </div>

                        {/* Subsection */}
                        <div>
                            {
                                activeStatus === course?._id && (
                                    <div>
                                        {
                                            course.subSection.map((topic , index) => (
                                                <div
                                                className={`flex gap-5 p-5 ${
                                                    videobarActive === topic._id ? 
                                                    "bg-yellow-200 text-richblack-900"
                                                    :
                                                    "bg-richblack-900 text-white "
                                                } `}
                                                key={index}
                                                onClick={()=>{
                                                    navigate(
                                                        `/view-course/${courseEntireData._id}/section/${courseEntireData._id}/subsection/${topic?._id}`
                                                    )
                                                    setVideobarActive(topic._id);
                                                }}
                                                >
                                                    <input 
                                                    type="checkbox" 
                                                    checked = {completedLectures.includes(topic?._id)}
                                                    onChange={()=> {}}
                                                    />
                                                    <span>
                                                        {topic.title}
                                                    </span>
                                                </div>
                                            ) )
                                        }
                                    </div>
                                )
                            }
                        </div>

                    </div>
                ) )
            }
        </div>

      </div>
    </>
  )
}

export default VideoDetailsSideBar
