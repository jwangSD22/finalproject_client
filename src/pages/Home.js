import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar.js";
import YouMayKnow from "../components/home/YouMayKnow.js";
import HomePosts from "../components/home/HomePosts.js";
import './Home.css'

const token = localStorage.getItem("jwt");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

function Home() {
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null);
  const [friends,setFriends] = useState(null)
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

    const retrieveFriends = async () => {
      try{
        let response = await axios.get(`/api/user/friends/${username}`)
        setFriends(response.data)
      }
      catch(err){
        console.log(err)
      }
    }



    checkLogin();
    retrieveData();
    retrieveFriends()
  }, []);


  return <>
  <Navbar data={data} username={username} />
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3 d-none d-md-block">
        <YouMayKnow data={data} friends={friends} username={username} />
      </div>
      <div className=" d-none d-xl-flex col-xl-1"></div>
<div className="col-md-8 col-lg-6 col-xxl-4 home-post-container">
  <HomePosts  username={username} allUsers={data}/>
</div>
</div>

  </div>
  </>;
}

export default Home;
