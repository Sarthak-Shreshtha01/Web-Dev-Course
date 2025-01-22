import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful])

    const submitContactForm = async (data) => {
        // console.log("Logging data" , data);
        try {
            setLoading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            // const response = {status: "OK"}
            console.log("Logging response", response);
            setLoading(false);
        }
        catch (error) {
            console.log("Error while submitting form", error.message);
            setLoading(false);
        }
    }



    return (
        <form className="flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)} >

            <div className="flex flex-col gap-5 lg:flex-row">
                {/* firstNamw */}
                <div className='flex flex-col gap-2 lg:w-[48%] ' >
                    <label htmlFor='firstname' className='label-style' >First Name</label>
                    <input
                        type="text"
                        name='firstname'
                        id='firstname'
                        placeholder='Enter First Name'
                        className='form-style'
                        {...register("firstname", { required: true })}
                    />
                    {
                        errors.firstname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter your Name
                            </span>
                        )
                    }
                </div>

                {/* lastname */}
                <div className="flex flex-col gap-2 lg:w-[48%]" >
                    <label htmlFor='lastname' className='label-style' >Last Name</label>
                    <input
                        type="text"
                        name='lastname'
                        id='lastname'
                        placeholder='Enter Last Name'
                        className='form-style'
                        {...register("lastname")}
                    />
                </div>
            </div>

            {/* email */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='label-style' >Email</label>
                <input
                    type="email"
                    name='email'
                    id='email'
                    placeholder='Enter Email Address'
                    className='form-style'
                    {...register("email", { required: true })}
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please Enter a valid Email
                        </span>
                    )
                }
            </div>

            {/* Phone Number */}
            <div className='flex flex-col gap-2 ' >
                <label htmlFor="phonenumber" className='label-style' >Phone Number</label>

                <div className='flex gap-5 ' >
                    {/* dropdown */}

                    <div className="flex w-[81px] flex-col gap-2">

                        <select
                            type="text"
                            name='dropdown'
                            id='dropdown'
                            placeholder="Enter first name"
                            className='form-style'
                            {...register("countrycode", { required: true })}
                        >
                            {
                                CountryCode.map((element, index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>

                    </div>

                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type="text"
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='form-style '
                            {...register("phoneNo",
                                {
                                    required: { value: true, message: "Please enter Phone Number" },
                                    maxLength: { value: 10, message: "Invalid Phone Number" },
                                    minLength: { value: 8, message: "Invalid Phone Number" }
                                })}
                        />
                    </div>
                </div>
                {
                    errors.phoneNo && (
                        <span className="-mt-1 text-[12px] text-yellow-100" >
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>

            {/* Message */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='message' className="lable-style" >Message</label>
                <textarea
                    type="email"
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    placeholder='Enter your message here'
                    className='form-style'
                    {...register("message", { required: true })}
                />
                {
                    errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your message
                        </span>
                    )
                }
            </div>

            <button 
            disabled={loading}
            type='submit' 
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                ${
                  !loading &&
                  "transition-all duration-200 hover:scale-95 hover:shadow-none"
                }  disabled:bg-richblack-500 sm:text-[16px] `} 
            >
                Send Message
            </button>
        </form>
    )
}

export default ContactUsForm
