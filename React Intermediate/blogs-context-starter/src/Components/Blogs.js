import React, { useContext } from 'react'
import { AppContext } from '../Context/Appcontext'
import Spinner from './Spinner';
import './Blogs.css'

const Blogs = () => {
    // Consume
    const {Posts, loading} = useContext(AppContext);

  return (
    <div className='w-11/12 max-w-[670px] py-2 flex flex-col gap-7 mt-[70px] mb-[70px] justify-center items-center'>{
        loading?(<Spinner/>) : 
        (
            (Posts.length === 0 )?
            (<div>
                <p>No Posts Available</p>
            </div>)
            :  
            (Posts.map((post) => (
                <div key={post.id}>
                    <p className='font-bold text-lg' >{post.title}</p>
                    <p className='text-sm mt-[4px]' >By <span className='italic'>{post.author}</span> on <span className='underline font-bold'>{post.category}</span> </p>
                    <p className='text-sm mt-[4px]'>Posted On <span>{post.date}</span> </p>
                    <p className='text-md mt-[14px]'>{post.content}</p>
                    <div className='flex gap-x-3 mt-[5px] '>
                        {post.tags.map((tag , index) => {
                            return <span key={index}
                            className='text-blue-500 underline font-bold text-xs '  >
                                 {`#${tag}`}
                            </span>
                        } )}
                    </div>
                </div>
            ) ))
        )
    }
    </div>
  )
}

export default Blogs