import React from 'react'
import Card from './Card';
import { useState } from 'react';

function Cards(props) {
    
    let courses = props.courses;

    let category = props.category;

    const [likedCourses, setlikedCourses] = useState([])

    // return list of all courses
    console.log(courses);
    
    function getCourses(){
        if(category=="All"){
            let allCourses =[];
            Object.values(courses).forEach(courseCategory =>{
                courseCategory.forEach(course => {
                    allCourses.push(course);
                })
            })
    
            return allCourses;
        }

        else{
            return courses[category];
        }

    }

    return(
        <div className='flex flex-wrap justify-center gap-4 mb-4'>
            {
            getCourses().map((course) => (
                <Card key={course.id} course = {course}
                likedCourses = {likedCourses}
                setlikedCourses = {setlikedCourses}
                 />
            ))
            }
        </div>
    ) ;
}

export default Cards;