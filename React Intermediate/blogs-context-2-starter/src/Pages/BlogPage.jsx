import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { baseUrl } from '../baseUrl'
import Header from '../components/Header'
import BlogDetails from '../components/BlogDetails'

const BlogPage = () => {
    const newUrl = "https://codehelp-apis.vercel.app/api/";
    const [blog, setBlog] = useState(null)
    const [relatedBlog, setRelatedBlog] = useState([])
    const location = useLocation();
    const navigation = useNavigate()
    const {setLoading , loading } = useContext(AppContext);

    const blogId = location.pathname.split('/').at(-1);

    async function fetchRelatedBlogs(){
        setLoading(true);
        let url = `${newUrl}get-blog?blogId=${blogId}` 
        console.log(url);
        try{
            const res = await fetch(url)
            const data = await res.json();
            setBlog(data.blog);
            setRelatedBlog(data.relatedBlogs)
        }
        catch(error){
            console.log(error);
            setBlog(null)
            setRelatedBlog([]);
        }
        setLoading(false)
    }

    useEffect(()=>{
        if(blogId){
            fetchRelatedBlogs();
        }
    },[location.pathname])

  return (
    <div>
        <Header/>
        <div>
            <button
            onClick={()=>navigation(-1)}>
                Back
            </button>
            {
                loading ? (<p>Loading</p>)
                :(
                    blog?
                    (
                        <div>
                            <BlogDetails post={blog}/>
                            <h2>Related Blogs</h2>
                            {
                                relatedBlog.map((post)=> (
                                    <div key={post.id}>
                                        <BlogDetails post={post} />
                                    </div>
                                ))
                            }
                        </div>
                    )
                    :(
                        <div>No Blog Found</div>
                    )
                )
            }
        </div>
    </div>
  )
}

export default BlogPage