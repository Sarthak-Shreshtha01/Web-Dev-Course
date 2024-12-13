import React from 'react'
import {AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const LoginForm = (props) => {

    const navigate = useNavigate();

    const [formData, setformData] = useState({
        email: '',
        password: ''
    })

    const [ShowPassword, setShowPassword] = useState(false);

    function changeHandler(event){
        setformData((prev) =>(
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ))
    }

    function submitHandler(event){
        event.preventDefault();
        props.setIsLoggedin(true);
        toast.success("Logged in")
        navigate("/dashboard")

        
    }

  return (
    <form onSubmit={submitHandler}
    className='flex flex-col w-full gap-y-4 mt-6 '
    >
        <label className='w-full '>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] '>
                Email Address <sup className='text-pink-200' >*</sup>
            </p>
            <input 
            required
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder='Enter email address'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            name='email'/>
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] '>
                Password <sup className='text-pink-200'>*</sup>
            </p>

            <input 
            required
            type={ShowPassword ? ('text') : ('password')}
            value={formData.password}
            onChange={changeHandler}
            placeholder='Enter Password'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            name='password'/>

            <span 
            className='absolute right-3 top-[38px] cursor-pointer  '
            onClick={()=>{
                setShowPassword(!ShowPassword)
            }}>
                {
                    ShowPassword?
                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
                    :
                    <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                }
            </span>

            <Link to="#">
                <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                    Forgot Password
                </p>
            </Link>

        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium
         text-richblack-900 px-[12px] py-[8px] mt-6' >
            Sign In
        </button>

    </form>
  )
}

export default LoginForm