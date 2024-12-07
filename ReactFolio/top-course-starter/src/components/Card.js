import React from 'react'
import {FcLike , FcLikePlaceholder} from 'react-icons/fc'
import { toast } from 'react-toastify';

const Card = (props) =>{
    let course = props.course;
    let likedCourses = props.likedCourses;
    let setlikedCourses = props.setlikedCourses;

    const clickHandler = () => {
        if(likedCourses.includes(course.id)){
            // Pehle se liked hai
            setlikedCourses((prev) => prev.filter((cid)=> (cid) !== course.id));
            toast.warning("Like Removed")
        }
        else{
            // Pehle se liked nahi hai
            if(likedCourses.length === 0){
                setlikedCourses([course.id]);
            }
            else{
                setlikedCourses((prev) => [...prev, course.id]);
            }
            toast.success("Like Added")
        }
    }

    return (
        <div className="w-[300px] bg-bgDark bg-opacity-80 rounded-md overflow-hidden">
            <div className='relative '>
                <img src={course.image.url} alt={course.image.alt} />
                <div className='w-[40px] h-[40px] bg-white rounded-full absolute right-2 bottom-[-12px] grid place-items-center'>
                    <button onClick={clickHandler}>
                        {
                            likedCourses.includes(course.id)? 
                            (<FcLike fontSize = "1.75rem" />) : 
                            (<FcLikePlaceholder fontSize = "1.75rem" />)  // Placeholder icon for unliked courses
 
                        }
                    </button>
                </div>
            </div>

            <div className='p-4'>
                <p className='text-white font-semibold text-lg leading-6'>{course.title}</p>
                <p className='mt-2 text-white'>
                    {
                        course.description.length>100 ?
                        (course.description.substr(0,100)) + "..." 
                        :(course.description)
                    }
                </p>
                    {/* {course.description}</p> */}
            </div>
        </div>
    )
}

export default Card;