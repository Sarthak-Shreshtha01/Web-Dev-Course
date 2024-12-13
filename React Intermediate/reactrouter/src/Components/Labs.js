import React from 'react'
import { useNavigate } from 'react-router-dom'

const Labs = () => {

    const navigate = useNavigate();

    function ClickHandler(){
        navigate('/about')
    }
    function backHandler(){
        navigate(-1)
    }

  return (
    <div>
        <div>This is labs page</div>
        <button onClick={ClickHandler}>Move to about page</button>
        <button onClick={backHandler}>Go back</button>
    </div>
  )
}

export default Labs