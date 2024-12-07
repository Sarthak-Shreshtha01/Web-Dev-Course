import './App.css';
import { Routes, Route } from'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = { <div>Home Page</div> } ></Route>
        <Route path='/support' element = { <div>Support Page</div> } ></Route>
        <Route path='/about' element = { <div>About Page</div> } ></Route>
        <Route path='/labs' element = { <div>Labs Page</div> } ></Route>
        <Route path='*' element = { <div>Error</div> } ></Route>
      </Routes>
    </div>
  );
}

export default App;
