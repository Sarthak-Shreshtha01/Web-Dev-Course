import React from 'react'
import Pagination from '../components/Pagination'
import Blogs from '../components/Blogs'
import Header from '../components/Header'

const Home = () => {
  return (
    <div>
        <Header/>
        <Blogs/>
        <Pagination/>
    </div>
  )
}

export default Home