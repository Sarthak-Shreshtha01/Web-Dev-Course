import Header from './Components/Header'
import Blogs from './Components/Blogs'
import Pagination from './Components/Pagination'
import { useContext, useEffect } from 'react';
import { AppContext } from './Context/Appcontext';
import './App.css'
import { Route, Routes } from 'react-router-dom';


export default function App() {

  const {fetchBlogPost} = useContext(AppContext)

  useEffect(() => {
    fetchBlogPost();
  }, [])
  

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/blog/:blogId' element={<BlogPage/>} />
      <Route path='/tags/tag' element={<TagPPage/>} />
      <Route path='/categories/:category' element={<CategoryPage/>} />
    </Routes>
  );
}
