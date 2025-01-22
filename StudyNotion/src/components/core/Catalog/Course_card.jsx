import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Course_card = ({course , Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course])

  return (
    <div>
      
        <Link to={`/courses/${course._id}`} >
            <div>
                <div>
                    <img
                        src={course?.thumbnail}
                        alt='Course thumbnail'
                        className={`${Height} w-full rounded-xl object-cover `}
                    />
                </div>
                <div className='flex gap-x-3' >
                    <p>{course?.courseName}</p>
                    <p> {course?.instructor?.firstName} {course?.instructor?.lastName} </p>
                    <div>
                        <span>{avgReviewCount || 0}</span>
                        <RatingStars Review_Couny = {avgReviewCount} />
                        <span>{course?.ratingAndReviews?.length} Rating</span>
                    </div>
                    <p>{course?.price}</p>
                </div>
            </div>
        </Link>

    </div>
  )
}

export default Course_card
