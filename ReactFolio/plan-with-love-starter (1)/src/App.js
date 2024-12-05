import React, { useState } from "react";
import data from './data';
import Tours from "./Components/Tours";

const App = () => {

  const [tours, setTours] = useState(data);

  function removeTour(id) {
    const newTours = tours.filter(tours => tours.id !== id);    
    setTours(newTours);
  }

  return (
    <div>
      <Tours tours={Tours}></Tours>
    </div>
  );
};

export default App;
