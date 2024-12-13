import React from 'react'
import {AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const SignupForm = (props) => {

    let setIsLoggedin = props.setIsLoggedin;

    const navigate = useNavigate();

    const [formData, setformData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [ShowPassword, setShowPassword] = useState(false)
    const [ConfirmPassword, setConfirmPassword] = useState(false)
    const [accountType, setaccountType] = useState('student');

    function changeHandler(event) {
        setformData((prev) => (
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault();
        if(formData.password != formData.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        setIsLoggedin(true);
        toast.success('Account Created');

        const accountdata = {
            ...formData
        }
        
        const finaldata = {
            ...accountdata , accountType
        }

        console.log(finaldata)

        navigate('/dashboard');

    }

    return (
        <div>
            <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
                <button 
                className={`${accountType === 'student'
                    ?"bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full"
                    :"bg-transparent text-richblack-200 py-2 px-5 rounded-full transition-all duration-200 "
                 }`}
                onClick={()=>{setaccountType('student')}}
                >Student</button>
                <button
                onClick={()=>{setaccountType('instructor')}}
                className={`${accountType === 'instructor'
                    ?"bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full"
                    :"bg-transparent text-richblack-200 py-2 px-5 rounded-full transition-all duration-200 "
                 }`}
                >Instructor</button>
            </div>

            <form onSubmit={submitHandler} >
                {/* Contain first and Last Name */}
                <div className='flex gap-x-4 mt-[20px]'>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ' >First Name<sup className='text-pink-200' >*</sup></p>
                        <input
                            required
                            type="text"
                            name='firstname'
                            onChange={changeHandler}
                            placeholder='Enter first name'
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                            value={formData.firstname}
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] '>Last Name<sup className='text-pink-200' >*</sup></p>
                        <input
                            required
                            type="text"
                            name='lastname'
                            onChange={changeHandler}
                            placeholder='Enter Last name'
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                            value={formData.lastname}
                        />
                    </label>
                </div>

                {/* email */}
                <div className=' mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] '>Email<sup className='text-pink-200' >*</sup></p>
                        <input
                            required
                            type="email"
                            name='email'
                            onChange={changeHandler}
                            placeholder='Enter Email name'
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                            value={formData.email}
                        />
                    </label>
                </div>

                {/* create password */}
                <div className='w-full flex gap-x-4 mt-[20px]'>
                    <label className='relative w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] '>Create Password<sup className='text-pink-200' >*</sup></p>
                        <input
                            required
                            type={ShowPassword ? ("text") : ("password")}
                            name='password'
                            onChange={changeHandler}
                            placeholder='Enter Password'
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                            value={formData.password}
                        />

                        <span
                        className='absolute right-3 top-[38px] cursor-pointer  '
                        onClick={() => {setShowPassword(!ShowPassword)}}>
                            {ShowPassword ?
                            <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                            :<AiOutlineEye fontSize={24} fill='#AFB2BF' />}
                        </span>
                    </label>
                    
                    <label className='relative w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] '>Confirm Password<sup className='text-pink-200' >*</sup></p>
                        <input
                            required
                            type={ConfirmPassword ? ("text") : ("password")}
                            name='confirmPassword'
                            onChange={changeHandler}
                            placeholder='Confirm Password'
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                            value={formData.confirmPassword}
                        />

                        <span
                        className='absolute right-3 top-[38px] cursor-pointer  '
                        onClick={() => {setConfirmPassword(!ConfirmPassword)}}>
                            {ConfirmPassword ?
                            <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                            :<AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
                        </span>
                    </label>

                </div>

                <button className='bg-yellow-50 rounded-[8px] font-medium
         text-richblack-900 px-[12px] py-[8px] mt-6 w-full' >
                    <p>
                        Create Account
                    </p>
                </button>

            </form>

        </div>
    )
}

export default SignupForm