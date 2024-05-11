import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

function Signup() {

  const [data, setData] = useState([]);

  const [user, setUser] = useState({
    Firstname: '', Lastname: '', Email: '', City: '', Gender: '', Dateofbirth: '', Age: ''
  })

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCountryStates, setSelectedCountryStates] = useState([]);
  const [selectedStateCities, setSelectedStateCities] = useState([]);

  const handleCountryChange = (e) => {
    const selectedCountryName = e.target.value;
    const selectedCountryData = data.find(item => country(item) === selectedCountryName);
    setSelectedCountry(selectedCountryName);
    setSelectedCountryStates(selectedCountryData ? selectedCountryData.states : []);
    setSelectedState('');
    setSelectedStateCities([]);
  };

  const handleStateChange = (e) => {
    const selectedStateName = e.target.value;
    setSelectedState(selectedStateName);
    const selectedStateData = selectedCountryStates.find(state => state.name === selectedStateName);
    setSelectedStateCities(selectedStateData ? selectedStateData.cities : []);
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setUser(prevUser => ({ ...prevUser, City: selectedCity }));
  };



  const handleinp = (e) => {
    let { name, value } = e.target


    setUser({ ...user, [name]: value })
    if (name === 'Dateofbirth') {
      calculateAge(value);
    }
  }
  const postdata = async (e) => {

    e.preventDefault()
    for (let key in user) {
      if (typeof user[key] === 'string' && user[key].trim() === '') {
        alert(`${key} cannot be empty`);
        return;
      }
    }
    await axios.post('http://localhost:9999/signup', { user, selectedCountry, selectedState })

  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/getdata');
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const country = (item) => {
    return item.name;
  };
  const state = (states) => {
    return states.map((state, index) => (
      <option key={index}>{state.name}</option>
    ));
  };

  const city = (states) => {
    return states.flatMap((state) => state.cities.map((city, index) => (
      <option key={index}>{city}</option>
    )));
  };

  const calculateAge = (dob) => {

    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setUser({ ...user, Age: age, Dateofbirth: dob });
  };

  return (
    <>
      <div className="container">
   
        <div className=" wrapper">
          
          <div className=" glass">
     
            <div className='left_side'>
              <div className=''>
                <img src={logo} alt="" />
                <h1>Welcome to Our User Sign Up Page</h1>
                <p>We offer a range of tech services to suit your vision and budget.Answer a few question and we'll give you a quote for our sirvicea </p>
              </div>

            </div>
            <div className="right_side">
              <div className='small_logo'>
                <img src={logo} alt="" />
                <h1>User Sign Up</h1>
              </div>
              <div>   <input type="text" name='Firstname' placeholder='Firstname' value={user.Firstname} onChange={handleinp} className='form-control' /></div>
              <div>  <input type="text" name='Lastname' placeholder='Lastname' value={user.Lastname} onChange={handleinp} className='form-control' /></div>
              <div>   <input type="text" name='Email' placeholder='Email' value={user.Email} onChange={handleinp} className='form-control' /></div>
              <select type="text" name='Country' value={selectedCountry} onChange={handleCountryChange} className='control'>
                {data.map((item, index) => (
                  <option key={index}>{country(item)}</option>
                ))}
              </select>

              <div>   <select type="text" name='State' value={selectedState} onChange={handleStateChange} className='control'>
                <option >Select State</option>
                {selectedCountryStates.map((state, index) => (
                  <option key={index}>{state.name}</option>
                ))}
              </select></div>

              <div>    <select type="text" name='City' value={user.City} onChange={handleCityChange} className='control'>
                <option >Select City</option>
                {selectedStateCities.map((city, index) => (
                  <option key={index}>{city}</option>
                ))}
              </select></div>

              <div className='radio_flex'>   <input type="radio" name='Gender' value="Male" onChange={handleinp} className='radio' /><span>Male</span>

                <input type="radio" name='Gender' value="Female" onChange={handleinp} className='radio' /> <span>Female</span></div>
              <div>  <input type="date" name='Dateofbirth' value={user.Dateofbirth} onChange={handleinp} id='Dateofbirth' className='form-control' />  </div>
              <div>    <input type="text" name='Age' placeholder='Age' value={user.Age} onChange={handleinp} className='form-control' />  </div>
              <div>   <button type="submit" onClick={postdata}>Click</button>  </div>
              <div> 
                 <button type="submit" className='smalview'>
                <Link to="/show" className='page'>View</Link>
              </button>  </div>
<div>     <button type="submit" className='viewpage'>
                <Link to="/show" className='page'>View</Link>
              </button></div>
           
            </div>
            </div>
            <div>
          

          </div>
       
        </div>
      </div>








    </>
  )
}

export default Signup