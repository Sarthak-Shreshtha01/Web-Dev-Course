import React from 'react'
import Template from '../Components/Template'
import signupImg from '../assets/signup.png'

const Signup = ({setIsLoggedin}) => {
  return (
    <Template
        title="Join the millions learing to code with StudyNotion for free"
        desc1="Build skills for today, tomorrow and beyond"
        desc2="Education to future proof your career"
        image={signupImg}
        formtype="signup"
        setIsLoggedin={setIsLoggedin}
    />
  )
}

export default Signup