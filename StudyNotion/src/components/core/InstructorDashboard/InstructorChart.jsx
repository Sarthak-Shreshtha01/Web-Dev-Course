import React from 'react'

import {Chart , registerables} from "charts.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);


const InstructorChart = () => {

    const [currChart, setCurrChart] = useState("students");

    // Function to generate random colors 

    const getRandomColor = (numColors) => {
        const colors = [];
        for( let i=0 ; i<numColors ; i++ ) {
            const color = `rgb(${Math.floor(Math.random() *256)} ,
             ${Math.floor(Math.random() *256)} ,
             ${Math.floor(Math.random() *256)} )`

            colors.push(color);
        }
        return colors;
    }

    // Create data for chart displaying student info

    const chartDataForStudents  = {
        labels : courses.map((course) => course.courseName ),
        dataset : [
            {
                data : course.map((course) => course.totalStudentsEnrolled ),
                backgroundColor : getRandomColor(courses.length),
            }
        ]
    }

    // Create data for chart displaying income info
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        dataset: [
            {
                data: courses.map((course) => course.totalAmountGenerated ),
                backgroundColor : getRandomColor(courses.length)
            }
        ]
    }

    // Options
    const options = {

    }

  return (
    <div>
      <p>Visualise</p>
      <div>
        <button onClick={()=> setCurrChart("students")} >
            Students
        </button>

        <button onClick={()=> setCurrChart("income")} >
            Income
        </button>
      </div>
      <div>
        <Pie 
          data = {currChart === "students" ? chartDataForStudents : chartDataForIncome  }
          options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart

