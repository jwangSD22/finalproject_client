import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Navbar from '../components/navbar/Navbar.js'
const token = localStorage.getItem('jwt');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

function Home() {
    const [user,setUser] = useState(null)
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const navigate = useNavigate()


    useEffect(()=>{
        const checkLogin = async () => {
            try{
                let response = await axios.get('/api/users/loginstatus')
                console.log('checking logged in status')
                if(response.status){
                    setUser(response.data.user.jwtusername)
                    setIsLoggedIn(true)
                }
            }
            catch(err)
            {
                if(err.response.status===401){
                    navigate('/')
                }
            }

    
     }
        checkLogin()
     },[])

  return (
    
<Navbar />
  )
}

export default Home