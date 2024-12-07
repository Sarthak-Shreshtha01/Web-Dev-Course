import './App.css';
import { useState } from'react';

function App() {

  // const [Firstname, setFirstname] = useState("");
  // const [Lastname, setLastname] = useState("")

  // console.log(Firstname);
  // console.log(Lastname);

  // function firstNameHandler(event){
  //   // console.log("Printing First Name");
  //   // console.log(event.target.value);
  //   setFirstname(event.target.value);  
  // }
  // function lastNameHandler(event){
  //   // console.log("Printing Last Name");
  //   // console.log(event.target.value);
  //   setLastname(event.target.value);
  // }

  const [formData , setformData] = useState({firstName: "", lastName: "" , email:"" , comments:"" , isVisible:true  , mode:"" , favCar:"" });

  console.log(formData);

  function ChangeHandler(event){
    const {name,value,checked,type} = event.target;
    setformData(prevFormData =>{
      return {
        ...prevFormData,
        [name] : type === "checkbox" ? checked : value
      }
    });
  }

  function submitHandler(event){
    event.preventDefault();
    console.log("final form");
    console.log(formData);
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='First Name' onChange={ChangeHandler} name='firstName' value={formData.firstName}/>
        <br />
        <br />
        <input type="text" placeholder='Last Name' onChange={ChangeHandler} name='lastName' value={formData.lastName} />
        <br />
        <br />
        <input type="email" placeholder='Email' onChange={ChangeHandler} name='email' value={formData.email} />
        <br />
        <br />

        <textarea placeholder='Enter your comments here'
        onChange={ChangeHandler}
        name="Comments" value={formData.comments}
        ></textarea>
        <br />
        <br />

        <input type="checkbox"
        onChange={ChangeHandler}
        name='isVisible'
        id='isVisible'
        checked={formData.isVisible}
        />
        <label htmlFor="isVisible">Are you Visible</label>

        <fieldset> 
          <legend>Mode:</legend>

          <input type="radio"
          onChange={ChangeHandler}
          name='mode'
          value="OnlineMode"
          id='OnlineMode' 
          checked={formData.mode == 'OnlineMode'}
          />
          <label htmlFor="OnlineMode">Online Mode</label>

          <input type="radio"
          onChange={ChangeHandler}
          name='mode'
          value="OfflineMode"
          id='OfflineMode' 
          checked={formData.mode == 'OfflineMode'}
          />
          <label htmlFor="OfflineMode">Offline Mode</label>

        </fieldset>

        <br />

        <select name="favCar" onChange={ChangeHandler} id="favCar">
          <option value="scorpio">Scorpio</option>
          <option value="fortuner">fortuner</option>
          <option value="defender">defender</option>
          {/* <option value="scorpio">Scorpio</option> */}
        </select>
        <label htmlFor="favCar">Tell me your fav car?</label>

        {/* <input type="submit" name="" id="" /> */}
        <br />
        <button>Submit</button>

      </form>
    </div>
  );
}

export default App;
