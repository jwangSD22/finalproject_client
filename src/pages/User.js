import React, { useState, useEffect } from "react";
import { useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar.js";
import emptyAvatar from '../images/empty_avatar.png'
import './Users.css'



const token = localStorage.getItem("jwt");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//YOU ARE HITTING API with GET '/api/users/:username'
//MAKE SURE PARAMS IS A USERNAME

function User() {
  const [thisUsername, setThisUsername ] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null);
  const [allData,setAllData] = useState(null)
  const [friends,setFriends] = useState(null)
  const [viewFriendsToggle,setViewFriendsToggle] = useState(false)
  const [thisUserSameProfile,setThisuserSameProfile] = useState(false)
  const [profilePhotoURL,setProfilePhotoURL] = useState(null)
  const navigate = useNavigate();
  const {username} = useParams()

  useEffect(() => {
    const checkLogin = async () => {
      try {
        let response = await axios.get("/api/users/loginstatus");
        if (response.status) {
          setThisUsername(response.data.user.jwtusername);
          setIsLoggedIn(true);
          setThisuserSameProfile(response.data.user.jwtusername===username)
        }
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/");
        }
      }
    };

    const retrieveAllData = async () => {
      try {
        let response = await axios.get(`/api/users/`);
        setAllData(response.data);
      } catch (err) {
        console.log(err);
      }
    };


    const retrieveData = async () => {
      try {
        let response = await axios.get(`/api/users/${username}`);
        setData(response.data);
        setProfilePhotoURL(response.data.profilePhotoURL)
      } catch (err) {
        console.log(err);
      }
    };

    const retrieveFriends = async () => {
      try{
        let response = await axios.get(`/api/user/friends/${username}`)
        console.log(response.data)
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

  const pattern = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1250 500">
  <defs>
    <pattern id="pattern" width="50" height="50" patternUnits="userSpaceOnUse">
      <circle cx="25" cy="25" r="10" fill="#3498db" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#pattern)" />
</svg>



  return (
    <>
      <Navbar data={allData} username={thisUsername} />
      <div className="top-container">
      <div className="background-container container" style={{width:'1250px',height:'500px'}}>
      {profilePhotoURL?<img src={profilePhotoURL}></img>:pattern}
              </div>

      <div  className="container d-flex flex-column-sm" >
        <div className="col-2" style={{height:"100px"}}>
        <img src={profilePhotoURL||emptyAvatar} width='auto' height='100%'></img>
        {thisUserSameProfile&&<div className="pfp-offset">OFFSET INFO</div>}
        </div>
        <div className="col-8 d-flex flex-column mt-auto"> 
        <div>{data.fullName}</div>
        <div>{data.friends.length} Friends</div>
        <div>FRIEND ICON GENERATOR TOP 10</div>
        </div>
        <div className="col-2 mt-auto">FRIEND BUTTONS</div>
        </div>
      </div>

      <div  className="container">MINI NAV BAR</div>
      <div  className="container">CONTAINER FOR MAIN 
      <div  className="container">stickY friends div</div>
      <div  className="container">
        /IF THIS IS THE SAME USER , POST CONTENT LINE HERE/

        POSTS GO HERE


      </div>

      </div>

      </>
  )
}

export default User
