// import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import { apiUrl , filterData } from "./data";
import { toast } from "react-toastify"
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "./components/Spinner"
// import "react-toastify/dist/ReactToastify.css"

// toast.configure();

const App = () => {

  const [courses, setcourses] = useState(null);

  const [loading, setloading] = useState(true);

  const [category, setCategory] = useState(filterData[0].title); 

  useEffect( () => {
    const fetchData = async() => {
      setloading(true);

      try{
        const res = await fetch(apiUrl );
        const output = await res.json();
        // console.log(data);
        setcourses(output.data); 
      }

      catch(error){
        toast.error("SomeThing went wrong")
      }
      setloading(false);
    }
    fetchData();
  },[])

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">

      <div>
        <Navbar />
      </div>

      <div className="bg-bgDark2">
        <div>
        <Filter filterData = {filterData} 
         apiUrl = {apiUrl} 
         category = {category}
         setCategory = {setCategory} />
        </div>

        <div className="w-11/12 max-w-[1200px] mx-auto flex justify-center items-center min-h-[50vh] flex-wrap">
          {loading ? (<Spinner/>) :(<Cards  courses = {courses} category = {category}  />)}
        </div>
      </div>

      
    </div>
  );
};

export default App;
