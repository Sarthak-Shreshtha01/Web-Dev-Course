import React from 'react'
import Template from '../Components/Template'
import loginImg from '../assets/login.png'

const Login = ({setIsLoggedin}) => {
  return (
    <Template
        title="Welcome Back"
        desc1="Build skills for today, tomorrow and beyond"
        desc2="Education to future proof your career"
        image={loginImg}
        formtype="login"
        setIsLoggedin={setIsLoggedin}
    />
  )
}

export default Login