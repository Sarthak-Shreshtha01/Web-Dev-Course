import "./App.css";
import {Route , Routes} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute"
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import {ACCOUNT_TYPE} from "./utils/constants"
import Settings from "./components/core/Dashboard/Settings/index"
import AddCourse from "./components/core/Dashboard/AddCourse";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)

  return (
    <div className=" w-screen min-h-screen bg-richblack-900 font-inter flex flex-col  ">
      <Navbar/>
      <Routes>
        <Route path='/' element= {<Home/>}  />

        <Route path= "login" 
        element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
          } 
        />

        <Route path= "signup" 
        element={
          <OpenRoute>
            <Signup/>
          </OpenRoute>
          } 
        />

        <Route path= "forgot-password" 
        element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
          } 
        />

        <Route path= "update-password:id" 
        element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
          } 
        />

        <Route path= "verify-email" 
        element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
          } 
        />

        <Route path= "about" 
        element={
          <OpenRoute>
            <About/>
          </OpenRoute>
          } 
        />

        <Route  
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
          } 
        >
          <Route path= "dashboard/my-profile" element={<MyProfile/>}/>
          <Route path= "dashboard/settings" element={<Settings/>} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="dashboard/cart" element={<Cart/>} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="dashboard/add-course" element={<AddCourse/>} />
              </>
            )
          }

        </Route>


        <Route path="*" element={<Error/>}  />

      </Routes>
    </div>
  );
}

export default App;
