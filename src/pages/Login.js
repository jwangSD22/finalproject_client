import Footer from '../components/footer/Footer';
import React, { useState,useEffect } from 'react';import './Login.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Registration from '../components/registration/Registration';
const token = localStorage.getItem('jwt');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null)
  const [showRegistration, setShowRegistration] = useState(false)
  
  const navigate = useNavigate();


  useEffect(()=>{
    const checkLogin = async () => {
      try{
        let response = await axios.get('/api/users/loginstatus')
        if(response.status){
            setUser(response.data.user.jwtusername)
            setIsLoggedIn(true)
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
        const response = await axios.post('/api/users/login',{emailOrUsername,password})
        if(response.status===200){
            localStorage.setItem('jwt',response.data.token)
            setUser(response.data.jwtusername)
        }


//force reload to trigger useEffect auto navigate logged-in users to /home
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

    return (
        <div>

        {showRegistration && <div className="overlay" />}
        {showRegistration&&<Registration showRegistration={showRegistration} setShowRegistration={setShowRegistration} />}

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