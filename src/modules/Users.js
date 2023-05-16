import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import Public from '../component/Public'
import Friends from '../component/Friends'
import Pending from '../component/Pending'

const token = localStorage.getItem('jwt');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;



function Users() {
  const navigate = useNavigate();
  const [user,setUser] = useState(null)
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        let response = await axios.get("/api/users/loginstatus");
        if (response.status === 200) {
          setUser(response.data.user.jwtusername);
          setIsLoggedIn(true);
          return true;
        }
      } catch (err) {
        console.log(err);
        return navigate("/");
      }
    };
    checkLogin();
  }, []);



  //use effect to check login status 
  //send user state down to Public so that it can filter out yourself

    

  return (
    <div className='users'><Public username = {user} /><Friends thisUser = {user}/><Pending thisUser = {user}/></div>
  )
}

export default Users