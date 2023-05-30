import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Navbar from '../components/navbar/Navbar.js'
const token = localStorage.getItem('jwt');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

function Friends() {
    const [username, setUsername] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [data, setData] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkLogin = async () => {
        try {
          let response = await axios.get("/api/users/loginstatus");
          if (response.status) {
            setUsername(response.data.user.jwtusername);
            setIsLoggedIn(true);
          }
        } catch (err) {
          if (err.response.status === 401) {
            navigate("/");
          }
        }
      };
  
      const retrieveData = async () => {
        try {
          let response = await axios.get("/api/users");
  
          setData(response.data);
        } catch (err) {
          console.log(err);
        }
      };
  
      checkLogin();
      retrieveData();
    }, []);

  return (
    
<Navbar data={data} username={username} />
  )
}

export default Friends
