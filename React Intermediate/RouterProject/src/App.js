import "./App.css";
import Navbar from "./Components/Navbar"
import Home from "./pages/Home"
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { useState } from "react";
import PrivateRoute from "./Components/PrivateRoute"

function App() {

  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <div className="w-screen h-screen bg-richblack-900 flex flex-col" >
      <Navbar isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
      <Routes>

        <Route path="/" element={<Home/>} ></Route>
        <Route path="/login" element={<Login setIsLoggedin={setIsLoggedin} />} ></Route>
        <Route path="/signup" element={<Signup setIsLoggedin={setIsLoggedin} />} ></Route>
        <Route path="/dashboard" element={
          <PrivateRoute isLoggedin={isLoggedin}>
            <Dashboard/>
          </PrivateRoute>
        } ></Route>

      </Routes>
    </div>
  )
}

export default App;
