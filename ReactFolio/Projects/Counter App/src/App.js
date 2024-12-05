import "./App.css";
import { useState } from 'react';


function App() {

  const [count, setcount] = useState(0)

  function decreaseHandler(){
    setcount(count-1);
  };

  function increaseHandler(){
    setcount(count+1);
  };

  function resetHandler(){
    setcount(0);
  };

  return (
    <div className = "w-[100vw] h-[100vh] flex justify-center items-center bg-[#344151] flex-col gap-10" >
      <div className = "text-[#0398d4] font-medium text-2xl " >INCREMENT and DECREMENT</div>
      <div className="bg-white flex justify-center gap-12 py-3 rounded-sm text-[25px] text-[#344151]">
        <div >
          <button onClick = {decreaseHandler} className="border-r-2 text-center w-20 border-[#bfbfbf] text-5xl">
            -
          </button>
        </div >

        <div className="font-bold gap-12 text-5xl">
          {count}
        </div>
        
        <div>
          <button onClick = {increaseHandler} className="border-l-2 text-center w-20 border-[#bfbfbf] text-5xl">+</button>
        </div>

      </div>

      <button onClick = {resetHandler} className="bg-[#0395d4] text-white px-5 py-2 rounded-sm text-lg"> Reset</button>
    
    </div>
    
  );
}

export default App;
