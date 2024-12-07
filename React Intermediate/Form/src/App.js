import "./App.css";
import { useState } from "react";

function App() {

  function ChangeHandler(event){
    const {name, value,checked,type} = event.target;

    setformData((prev) =>{
      return {
       ...prev,
        [name]: type === 'checkbox'? checked : value
      }
    })

  }

  function submitHandler(event){
    event.preventDefault();
    console.log("Printing final data");
    console.log(formData);
  }

  const [formData, setformData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country: 'India',
    streetAdress: '',
    city: '',
    state: '',
    postalCode: '',
    comments:false,
    candidates: false,
    offers:false,
    pushNotifications: ""
  })

  return (
    <div className="flex flex-col items-center">

      <form onSubmit={submitHandler}>

        <label htmlFor="firstname">First Name</label>
        <br />
        <input type="text" 
        name="firstname"
        id="firstname" 
        placeholder='Sarthak'
        value={formData.firstname}
        onChange={ChangeHandler}
        className="outline "
        />

        <br />
        <label htmlFor="lastname">Last Name</label>
        <br />
        <input type="text" 
        name="lastname"
        id="lastname" 
        placeholder='Shreshtha'
        value={formData.lastname}
        onChange={ChangeHandler}
        className="outline "
        />


        <br />
        <label htmlFor="email">Email Adress</label>
        <br />
        <input type="text" 
        name="email"
        id="email" 
        placeholder='Sarthak@abc'
        value={formData.email}
        onChange={ChangeHandler}
        className="outline "
        />
        <br />

        <label htmlFor="country">Country</label>
        <br />
        <select
        id="country"
        value={formData.country}
        name="country"
        onChange={ChangeHandler}
        className="outline"> 
          <option value="India">India</option>
          <option value="Unitied-States">Unitied-States</option>
          <option value="Canada">Canada</option>
          <option value="Mexico">Mexico</option>
        </select>

        <br />
        <label htmlFor="streetAdress">Street Address</label>
        <br />
        <input type="text" 
        name="streetAdress"
        id="streetAdress" 
        placeholder='bramhaniketan'
        value={formData.streetAdress}
        onChange={ChangeHandler}
        className="outline "
        />

        <br />
        <label htmlFor="city">City</label>
        <br />
        <input type="text" 
        name="city"
        id="city" 
        placeholder='Bokaro'
        value={formData.city}
        onChange={ChangeHandler}
        className="outline "
        />

        <br />
        <label htmlFor="state">State</label>
        <br />
        <input type="text" 
        name="state"
        id="state" 
        placeholder='Jharkhand'
        value={formData.state}
        onChange={ChangeHandler}
        className="outline "
        />

        <br />
        <label htmlFor="postalCode">Postal Code</label>
        <br />
        <input type="text" 
        name="postalCode"
        id="postalCode" 
        placeholder='827013'
        value={formData.postalCode}
        onChange={ChangeHandler}
        className="outline "
        />

        <fieldset>
          <br />
          <legend>By Email</legend>

          <div className="flex">
            <input type="checkbox"
            id="comments" 
            name="comments"
            checked={formData.comments}
            onChange={ChangeHandler}
            />
            <div>
              <label htmlFor="comments">Comments</label>
              <p>Get Notified when someone posts a blog</p>
            </div>
          </div>

          <div className="flex">
            <input type="checkbox"
            id="candidates" 
            name="candidates"
            checked={formData.candidates}
            onChange={ChangeHandler}
            />
            <div>
              <label htmlFor="candidates">Candidates</label>
              <p>Get Notified when Candidate posts a blog</p>
            </div>
          </div>

          <div className="flex">
            <input type="checkbox"
            id="offers" 
            name="offers"
            checked={formData.offers}
            onChange={ChangeHandler}
            />
            <div>
              <label htmlFor="offers">Comments</label>
              <p>Get Notified when there is a offer</p>
            </div>
          </div>

        </fieldset>

        <fieldset>
          <br />
          <legend>Push Notification</legend>

          <p>These are delivered via SMS to your phone</p>

          <input type="radio" 
            id = "pushEverything"
            name="pushNotifications"
            value="Everything"
            onChange={ChangeHandler}
          />
          <label htmlFor="pushEverything">Everything</label>
          <br />

          <input type="radio" 
            id = "pushEmail"
            name="pushNotifications"
            value="same as email"
            onChange={ChangeHandler}
          />
          <label htmlFor="pushEmail">Same as Email</label>
          <br /> 

          <input type="radio" 
            id = "pushNothing"
            name="pushNotifications"
            value="No push Notification"
            onChange={ChangeHandler}
          />
          <label htmlFor="pushNothing">No push Notification</label>

        </fieldset>

        <button className="bg-blue-500 text-white font-bold rounded py-2 px-4 " type="submit" >Save</button>


      </form>

    </div>
  );
}

export default App;
