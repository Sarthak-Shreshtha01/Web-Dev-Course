import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo.svg'
import {toast} from 'react-hot-toast'

const Navbar = (props) => {

    let isLoggedin = props.isLoggedin;
    let setIsLoggedin = props.setIsLoggedin;


  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto '>
        <Link to = "/" >
            <img src={logo} alt="logo" width={160} height={32} loading='lazy' />
        </Link>

        <nav >
            <ul className='flex gap-x-6 text-richblack-100 '>
                <li>
                    <Link to = "/">Home</Link>
                </li>
                <li>
                    <Link to = "/">About</Link>
                </li>
                <li>
                    <Link to = "/">Contact</Link>
                </li>
            </ul>
        </nav>

        <div className='flex items-center gap-x-4 '>
            
            {!isLoggedin && <Link to='/login' onClick={() =>{
                // toast.success("Logged In")
    
            }} >
                <button className=' bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 ' >
                    Login
                </button>
            </Link>}

            {!isLoggedin && <Link to='/signup'>
                <button className=' bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 '>
                    Sign Up
                </button>
            </Link>}

            {isLoggedin && <Link to='/' onClick={()=>{
                toast.success("Logged Out")
                setIsLoggedin(false)
            }} >
                <button className=' bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 '>
                    Log Out
                </button>
            </Link>}

            {isLoggedin && <Link to='/dashboard'>
                <button className=' bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 '>
                    DashBoard
                </button>
            </Link>}
        </div>


    </div>
  )
}

export default Navbar