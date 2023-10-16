import Footer from '../components/footer/Footer.js';
import React, { useState,useEffect } from 'react';import './Login.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import config from '../helper/config.js'
import Registration from '../components/registration/Registration.js';
import wave from '../images/wave.png'

const token = localStorage.getItem('jwt');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;



const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const [showRegistration, setShowRegistration] = useState(false)
  
  const navigate = useNavigate();


  useEffect(()=>{
    const checkLogin = async () => {
      try{
        let response = await axios.get(`${config.backendServer}/api/users/loginstatus`)
        if(response.status){
            navigate('/home')
        }
      }
      catch(err){
        console.log(err)
      }
 }
    checkLogin()

    
 },[])

 const handleSubmit = async (event) => {
  event.preventDefault();

  //axios the submission, if verfiied, then server will send back something and then use react to set USER
    try{
       
        const response = await axios.post(`${config.backendServer}/api/users/login`,{emailOrUsername,password})
        if(response.status===200){
            localStorage.setItem('jwt',response.data.token)
            // setUser(response.data.jwtusername)
        }
        window.location.reload();
        }
  
    catch (err){
      if(err.response.status===401){
        setEmailOrUsername('')
        setPassword('')
        setError(`${err.response.data.error}`)
      }
    }

};



const loadDemoUser = async () => {
  setEmailOrUsername("Abner92")
  setPassword("H4yns8hGuZgjvdOE6u1T")

  setTimeout(()=>document.getElementById("loginform").requestSubmit()
    ,250)


}


    return (
        <div>

        {showRegistration && <div className="overlay" />}
        {showRegistration&&<Registration showRegistration={showRegistration} setShowRegistration={setShowRegistration} />}

      <div className="login-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column brand-message mb-5">
              <div className="waveContainer" style={{fontFamily:'Impact',fontSize:'52px',fontStyle:'bold',color:'white'}}>
              <div className='wave_logo'><img src={wave} alt='wave png Designed by brgfx / Freepik'></img></div>
              <div className='mx-3'>Sharewave</div> 
             
                </div>
  
              <div className='col-lg-10'>
              <h2 style={{color:'#ededed'}}>Surf on the Sharewave to connect with friends around the world</h2>

              </div>
            </div>
            <div className="col-lg-4 login-box">
 
              <form id="loginform" onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <input type="text" id="username" className="form-control" placeholder='Username or Email' autoComplete='username'
                  value={emailOrUsername} onChange={e => setEmailOrUsername(e.target.value)}/>
                </div>
                <div className="form-group mb-2">
                  <input type="password" id="password" className="form-control" placeholder='Password' autoComplete='current-password'
                  value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                {error&&<div display="none" className='text-danger  mb-2'><em>{error}</em></div>}
                <button type="submit" className="btn btn-primary mb-2">Login</button>
                <button type="button" className="btn btn-secondary" onClick={loadDemoUser}>Login with Demo User</button>
                <hr className="my-3" />

                <button type="button" className="btn btn-success mb-2 newuser" onClick={()=>{setShowRegistration(!showRegistration)}}>Register New User</button>
                
              </form>
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
      </div>
    );
  };

  
  

export default Login
