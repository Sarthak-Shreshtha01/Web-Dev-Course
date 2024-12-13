import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from './Spinner';
import useGif from '../hooks/useGif';

const Tag = () => {
    
    const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
    
    // const [gif, setgif] = useState("")
    // const [loading, setloading] = useState(false)
    const [tag, settag] = useState('')
    
    // async function fetchData(){
    //     setloading(true);
    //     const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
    //     const {data} = await axios.get(url);
    //     const imagesource = data.data.images.downsized_large.url;
    //     setgif(imagesource);
    //     setloading(false);
    // }
    
    // useEffect(()=>{
    //     fetchData();
    // }, []);
    
    const {gif , loading , fetchData} = useGif(tag);



  return (
    <div className='w-1/2  bg-blue-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px] '>
        <h1 className='mt-[15px] text-2xl uppercase font-bold'>Random {tag} GIF</h1>
        {
            loading ? (<Spinner/>) : (<img src={gif} width="450" /> )
        }

        <input 
            className='w-10/12  text-lg py-2 rounded-lg mb-[3px] text-center'
            onChange={(event) => {
                settag(event.target.value);
            } }
            value={tag}
        />

        <button onClick={() =>{
            fetchData(tag);
        }} className='w-10/12 bg-yellow-500 text-lg py-2 rounded-lg  mb-[20px]'>Generate</button>
    </div>
  )
}

export default Tag