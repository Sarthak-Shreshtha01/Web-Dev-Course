import React from 'react'
import {Swiper , SwiperSlide } from 'swiper'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {FreeMode , Pagination , Autoplay ,Navigation } from "swiper"

import Course_card from './Course_card'

const CourseSlider = ({Courses}) => {
  return (
    <>
      {
        Courses?.length? (
            <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={200}
            Pagination = {true}
            modules={[Pagination,Autoplay,Navigation]}
            classname="mySwiper"
            autoPlay={{
                delay:1000,
                disableOnInteraction: false,
            }}
            navigation = {true}
            breakpoints={{
                1024:{slidesPerView:3}
            }}
            >
                {
                    Courses?.map((course , index)=> (
                        <SwiperSlide key={index} >
                            <Course_card course={course} Height={"h-[250px]"} />
                        </SwiperSlide>
                    ) )
                }
            </Swiper>
        )
        :
        (<p>No Course Found</p>)
      }
    </> 
  )
}

export default CourseSlider
