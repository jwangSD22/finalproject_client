import Footer from '../components/footer/Footer';
import React, { useState,useEffect } from 'react';import './Login.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
const token = localStorage.getItem('jwt');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null)
  const navigate = useNavigate();


  useEffect(()=>{
    const checkLogin = async () => {
     let response = await axios.get('/api/users/loginstatus')
     console.log('checking logged in status')
     if(response.status){
         setUser(response.data.user.jwtusername)
         setIsLoggedIn(true)
     }
 }
    checkLogin()
 },[])

 const handleSubmit = async (event) => {
  event.preventDefault();

  //axios the submission, if verfiied, then server will send back something and then use react to set USER
    try{
        const response = await axios.post('/api/users/login',{emailOrUsername,password})
        console.log(response)
        if(response.status===200){
            console.log(response)
            localStorage.setItem('jwt',response.data.token)
            setUser(response.data.jwtusername)
        }

        //REDIRECT TO MAIN

        // window.location.reload();

        
    }

    // 401 error found on catch
    //err.response.status === 401
    //err.response.data is JSON
    
    catch (err){
      if(err.response.status===401){
        setEmailOrUsername('')
        setPassword('')
        setError(`${err.response.data.error}`)
      }
    }
};

    return (
        <div>
        
      <div className="login-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column brand-message mb-5">
              <h1>WaveLink $</h1>
              <div className='col-lg-10'>
              <h2>Connect, share, and inspire with friends and the rest of the world.</h2>

              </div>
            </div>
            <div className="col-lg-4 login-box">
 
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <input type="text" id="username" className="form-control" placeholder='Username or Email'
                  value={emailOrUsername} onChange={e => setEmailOrUsername(e.target.value)}/>
                </div>
                <div className="form-group mb-2">
                  <input type="password" id="password" className="form-control" placeholder='Password'
                  value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                {error&&<div display="none" className='text-danger  mb-2'><em>{error}</em></div>}
                <button type="submit" className="btn btn-primary mb-2">Login</button>
                <button type="button" className="btn btn-secondary ">Login with Demo User</button>
                <hr className="my-3" />

                <button type="button" className="btn btn-success mb-2 newuser" onClick={()=>{console.log(error)}}>Register New User</button>
                
                
              </form>
            </div>
          </div>
        </div>
        
      </div>
      <footer className="footer d-flex justify-content-center">Your App Name &copy; {new Date().getFullYear()}</footer>
      </div>
    );
  };

  
  

export default Login