import './App.css';
import { Routes, Route, NavLink } from'react-router-dom';
import About from './Components/About';
import Home from './Components/Home';
import Support from './Components/Support';
import Labs from './Components/Labs';
import NotFound from './Components/NotFound';
import { Link } from'react-router-dom';
import MainHeader from './Components/MainHeader';

function App() {
  return (
    <div className="App">

      <nav>
        <ul>
          <li>
            <NavLink to="/" >Home</NavLink>
          </li>
          <li>
            <NavLink to="/support" >Support</NavLink>
          </li>
          <li>
            <NavLink to="/about" >About</NavLink>
          </li>
          <li>
            <NavLink to="/labs" >Labs</NavLink>
          </li>
          
        </ul>
      </nav>

      <Routes>
        <Route path='/' element = { <MainHeader/> } >

          {/* This will become default route */}
          <Route index element = { <Home/> } ></Route>
          <Route path='/support' element = { <Support/> } ></Route>
          <Route path='/about' element = { <About/> } ></Route>
          <Route path='/labs' element = { <Labs/> } ></Route>
          <Route path='*' element = { <NotFound/> } ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
